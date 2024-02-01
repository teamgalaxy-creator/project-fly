// helper.ts
import { Position } from '@turf/turf';
import { supabase } from '~/supabase/supabaseClient';
import { TravelFormData } from '~/utility/models';
import { lookupTimezone } from '~/utility/utils';

const addTimezoneToTravelPoints = (travelPoints: TravelFormData[]) => {
  const updatedTravelPoints = [];

  for (let i = 0; i < travelPoints.length; i++) {
    const point = travelPoints[i];
    const arrival = point.arrival || {};
    const departure = point.departure || {};

    // Add timezone property to arrival
    if (arrival.location) {
      const coordinates = arrival.location.coordinates as Position;
      arrival.timezone = lookupTimezone(coordinates[1], coordinates[0]);
    }

    // Add timezone property to departure
    if (departure.location) {
      const coordinates = departure.location.coordinates as Position;
      departure.timezone = lookupTimezone(coordinates[1], coordinates[0]);
    }

    updatedTravelPoints.push({
      ...point,
      arrival,
      departure,
    });
  }

  return updatedTravelPoints;
};

export async function addtoTravelHistory(
  travelArray: TravelFormData[],
  email: string,
) {
  try {
    const { data, error } = await supabase
      .from('Travel History') // Replace with the name of your table
      .upsert({
        travelPoints: travelArray,
        email: email,
      })
      .select();

    if (error) {
      console.error('Error upserting data:', error.message);
      return { error };
    } else {
      return { data };
    }
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
}

// Function to retrieve data from the table
export async function getTravelHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from('Travel History')
      .select()
      .eq('UUID', userId) // Filter by email
      .order('id', { ascending: true });

    const newData = [];
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        let item = data[i];

        let updatedItem = {
          ...item,
          travelPoints: addTimezoneToTravelPoints(item.travelPoints),
        };
        newData.push(updatedItem);
      }
    }

    if (error) {
      console.error('Error fetching data:', error.message);
      return { error };
    } else {
      return { data };
    }
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
}
export async function deleteTravelHistory(userId: string, id: number) {
  try {
    const { error } = await supabase
      .from('Travel History')
      .delete()
      .eq('UUID', userId) // Filter by email
      .eq('id', id); // Filter by email

    if (error) {
      console.error('Error deleting data:', error.message);
      return { error };
    } else {
      console.error('Data Deleted');
    }
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
}

export async function updateTravelHistoryById(
  travelArray: TravelFormData[],
  recordId: number,
) {
  try {
    const { data, error } = await supabase
      .from('Travel History')
      .update({ travelPoints: travelArray })
      .eq('id', recordId)
      .select();

    if (error) {
      console.error('Error updating data:', error.message);
      return { error };
    } else {
      return { data };
    }
  } catch (error) {
    console.error('Error:', error);
    return { error };
  }
}
