// helper.ts
import { supabase } from '~/supabase/supabaseClient';

interface SubmitFeedbackResult {
  success: boolean;
  message: string;
}

export async function submitFeedback(
  description: string,
  type: string,
  uuid: string,
): Promise<SubmitFeedbackResult> {
  try {
    const { data, error } = await supabase
      .from('Feedback') // Replace with the name of your table
      .upsert({
        description: description,
        type: type,
        UUID: uuid,
      })

      .select();
    if (error) {
      console.error('Error upserting data:', error.message);
      return { success: false, message: error.message };
    } else {
      return { success: true, message: 'Feedback submitted successfully' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: (error as Error).message };
  }
}
