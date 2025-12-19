const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://pzfckwvctcrompfhax.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6Y2ZrY3dudmN0Y3JvbXBmaGF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5OTE3MTksImV4cCI6MjA4MTU2NzcxOX0.-SgGtI4RNILOwi4tqqatHgpRMANx3mMDrlQMY__ofZk";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log("Testing Supabase connexion...");
    try {
        const { data, error } = await supabase.from('empires').select('count', { count: 'exact', head: true });
        if (error) {
            console.error("Supabase Error:", error);
        } else {
            console.log("Connection Successful! Data:", data);
        }
    } catch (err) {
        console.error("Network/Fetch Error:", err);
    }
}

testConnection();
