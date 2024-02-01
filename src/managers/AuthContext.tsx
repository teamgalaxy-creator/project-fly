import React, { createContext, useContext, useRef } from 'react';
import { supabase } from '~/supabase/supabaseClient';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import { useSelector } from '~/redux/reducers';

interface AuthContextProps {
  signIn: (props: SignInProps) => Promise<any>;
  signUp: (props: SignUpProps) => Promise<any>;
  updatePassword: (props: UpdatePasswordProps) => Promise<any>;
  resetPassword: (props: ResetPasswordProps) => Promise<any>;
  signOut: () => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  updateUserData: (formData: any) => Promise<any>;
}

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  password: string;
  fullName: string;
}
interface UpdatePasswordProps {
  newPassword: string;
}

interface ResetPasswordProps {
  email: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const userID: string = useSelector((state: any) => state.MapReducers.userID);

  const user = useRef<any>(userID);
  const dispatch = useDispatch();

  const signIn = async (props: SignInProps) => {
    try {
      const { email, password } = props;
      const { data, error }: any = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { message: `Error signing in: ${error.message}`, error };
      }

      if (data) {
        const user = data.user;

        dispatch(ActionsCreator.setUserID(user.id));
        dispatch(ActionsCreator.setUserEmail(user.email as string));
        dispatch(ActionsCreator.setUserName(user.user_metadata.full_name));

        if (user.user_metadata?.profile_picture)
          dispatch(
            ActionsCreator.setUserProfileImageURL(
              user.user_metadata.profile_picture,
            ),
          );

        console.log(user.id);

        user.current = user.id;

        return { message: 'The user is logged in!', data };
      } else {
        // Handle the case where the user canceled the login.
        return { message: 'User login canceled.' };
      }
    } catch (error) {
      return { message: `Error signing in` };
    }
  };

  async function signUp(props: SignUpProps) {
    try {
      const { email, password, fullName } = props;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'https://www.vizualtravel.com/login/?param1=value1',

          data: {
            full_name: fullName,
          },
        },
      });
      if (error) {
        return { message: `Error signing up: ${error.message}`, error };
      }

      return { message: 'The user has been signed up successfully!', data };
    } catch (error) {
      return { message: `Error signing up` };
    }
  }
  async function updatePassword(props: UpdatePasswordProps) {
    try {
      const { newPassword } = props;
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        return { message: `Error updating password: ${error.message}`, error };
      }
      return { message: 'Password has been updated successfully!', data };
    } catch (error) {
      return { message: `Error updating password` };
    }
  }
  async function resetPassword(props: ResetPasswordProps) {
    try {
      const { email } = props;
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://www.vizualtravel.com/newpassword',
      });
      if (error) {
        return { message: `Error signing up: ${error.message}`, error };
      }
      return { message: 'The user has been signed up successfully!', data };
    } catch (error) {
      return { message: `Error signing up` };
    }
  }

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://www.vizualtravel.com/homepage',
        },
      });

      if (error) {
        return { message: `Error signing in: ${error.message}`, error };
      }

      if (data) {
        // The user is signed in with Google.
        // localStorage.setItem('token', JSON.stringify(data));
        return { message: 'The user is signed in with Google!', data };
      } else {
        // Handle the case where the user canceled the login.
        return { message: 'Google login canceled by the user.' };
      }
    } catch (error) {
      return { message: `Error signing in with Google` };
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut();

      user.current = null;
      return { message: 'User has been successfully logged out' };
    } catch (error) {
      return { message: `Error signing up` };
    }
  }

  const updateUserData = async (formData: any) => {
    try {
      if (formData.password !== formData.confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
      }

      // Common options for updateUser
      const commonOptions: {
        data?: {
          full_name?: string | undefined;
          profile_picture?: string | undefined | null;
        };
        password?: string;
      } = {};

      // Check if full_name and/or password are provided and add to options
      if (formData.fullName !== '') {
        commonOptions.data = {
          ...commonOptions.data,
          full_name: formData.fullName,
        };
      }

      if (formData.password !== '') {
        commonOptions.password = formData.password;
      }

      if (formData.profilePicture) {
        const {
          success: uploadSuccess,
          imageUrl,
          error: uploadError,
        } = await uploadProfilePicture(user.current, formData.profilePicture);

        if (!uploadSuccess) {
          console.error('Error uploading profile picture:', uploadError);
          return { success: false, error: uploadError };
        }
        commonOptions.data = {
          ...(commonOptions.data || {}),
          profile_picture: imageUrl?.data.publicUrl,
        };
      }

      // Update user data in the database
      const { data, error } = await supabase.auth.updateUser(commonOptions);

      if (error) {
        // Handle error here if needed
        console.error('Error updating user data:', error);
        return { success: false, error: error.message };
      } else {
        // Update the user state with the new data
        user.current = data.user.id;

        return { success: true, data };
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      return { success: false, error: error };
    }
  };

  const uploadProfilePicture = async (userId: string, file: File) => {
    try {
      const userFolder = `users/${userId}/`;

      // Check if the image with the same name already exists in the user's folder
      const imageName = file.name;
      const { data: filesInFolder, error: filesError } = await supabase.storage
        .from('profile-images')
        .list(`${userFolder}`);

      if (filesError) {
        console.error('Error checking files in folder:', filesError);
        return { success: false, error: filesError.message };
      }

      const isImageAlreadyUploaded = filesInFolder.some(
        (file) => file.name === imageName,
      );

      if (!isImageAlreadyUploaded) {
        const { data: uploadData, error } = await supabase.storage
          .from('profile-images')
          .upload(`${userFolder}${file.name}`, file);

        if (error) {
          console.error('Error uploading image:', error);
          return { success: false, error: error.message };
        }

        const newImageUrl = await supabase.storage
          .from('profile-images')
          .getPublicUrl(uploadData?.path);

        console.log('New image uploaded:', newImageUrl);

        return { success: true, isNew: true, imageUrl: newImageUrl };
      } else {
        console.log('Image already exists in the folder. Skipping upload.');

        const existingImage = filesInFolder.find(
          (file) => file.name === imageName,
        );

        if (existingImage) {
          const existingImageUrl = await supabase.storage
            .from('profile-images')
            .getPublicUrl(`${userFolder}${existingImage.name}`);

          return { success: true, isNew: false, imageUrl: existingImageUrl };
        } else {
          return { success: false, error: 'Existing image not found.' };
        }
      }
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const value: AuthContextProps = {
    signIn,
    signUp,
    signOut,
    updatePassword,
    resetPassword,
    signInWithGoogle,
    updateUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
