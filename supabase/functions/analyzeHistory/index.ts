
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@^0.3.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { text } = await req.json()
    const apiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!apiKey) {
      throw new Error('Missing Gemini API key')
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Create a structured prompt for historical analysis
    const prompt = `Analyze this historical text and extract the following information in JSON format:
    - key events (with dates if available)
    - important characters/people
    - significant locations
    - key terms or concepts
    - relationships between entities
    
    Text to analyze: ${text}
    
    Please format the response as a JSON object with these keys: events, people, locations, terms, relationships`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const analysisText = response.text()
    
    console.log('Analysis completed successfully')

    return new Response(
      JSON.stringify({ analysis: analysisText }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
