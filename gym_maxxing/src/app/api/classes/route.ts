import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(req.url);
    const gymId = url.searchParams.get('gym_id') || '1';
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');
    const category = url.searchParams.get('category');
    
    // Initialize SQL connection
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Build the base query
    let queryString = `
      SELECT id, name, description, date, start_time, end_time, 
             instructor, category, max_capacity, current_bookings, location, 
             is_cancelled, gym_id
      FROM fitnessclass
      WHERE gym_id = $1`;
    
    // Prepare the parameters array
    const params = [gymId];
    
    // Add date range filter if provided
    if (startDate && endDate) {
      queryString += ` AND date >= $2 AND date <= $3`;
      params.push(startDate, endDate);
    }
    
    // Add category filter if provided
    if (category && category !== 'all') {
      const paramIndex = params.length + 1;
      queryString += ` AND category = $${paramIndex}`;
      params.push(category);
    }
    
    // Order by date and time
    queryString += ` ORDER BY date ASC, start_time ASC`;
    
    // Execute the query
    console.log("Fetching classes with params:", params);
    const result = await sql(queryString, params);
    
    // Return the results
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" }, 
      { status: 500 }
    );
  }
}