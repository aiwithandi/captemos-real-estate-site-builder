import { createClient } from "@supabase/supabase-js"
import { readFile } from "node:fs/promises"

const url=process.env.NEXT_PUBLIC_SUPABASE_URL
const key=process.env.SUPABASE_SERVICE_ROLE_KEY
const email=process.env.DEMO_USER_EMAIL||"demo@aurelia.local"
const password=process.env.DEMO_USER_PASSWORD
if(!url||!key||!password)throw new Error("Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and DEMO_USER_PASSWORD before seeding.")
if(password.length<16)throw new Error("DEMO_USER_PASSWORD must contain at least 16 characters.")
if(/\.supabase\.co$/.test(new URL(url).hostname)&&process.env.ALLOW_REMOTE_DEMO_SEED!=="true")throw new Error("Remote seed blocked. Use a local project or set ALLOW_REMOTE_DEMO_SEED=true after verifying a development project.")
const supabase=createClient(url,key,{auth:{persistSession:false}})
const listed=await supabase.auth.admin.listUsers({page:1,perPage:1000})
let user=listed.data.users.find(item=>item.email===email)
if(!user){const created=await supabase.auth.admin.createUser({email,password,email_confirm:true,user_metadata:{full_name:"Alex Morgan",role:"agency_owner",agency_name:"Aurelia Estates"}});if(created.error)throw created.error;user=created.data.user}
if(!user)throw new Error("Demo user was not created.")
const profile=await supabase.from("site_profiles").upsert({owner_id:user.id,brand_name:"Aurelia Estates",market:"Marbella",contact_email:"hello@example.com",contact_phone:"+34 600 000 000",published:true},{onConflict:"owner_id"});if(profile.error)throw profile.error
const feed=JSON.parse(await readFile(new URL("../src/data/demo-feed.json",import.meta.url),"utf8"))
const rows=feed.map(property=>({owner_id:user.id,external_id:property.id,slug:property.slug,payload:property,published:true,synced_at:new Date().toISOString()}))
const seeded=await supabase.from("property_cache").upsert(rows,{onConflict:"owner_id,external_id"});if(seeded.error)throw seeded.error
console.log(`Seeded ${rows.length} demo properties for the configured development user.`)
