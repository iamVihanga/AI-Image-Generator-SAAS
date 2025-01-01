## Project Timeline

- [x] Intro 00:00:00
- [x] AI Sass Demo 00:01:24
- [x] Scrimba (Sponsor) 00:15:58
- [x] Setup & Installation 00:18:16
- [x] Authentication pages 00:25:15
- [x] Creating Supabase project 01:01:45
- [x] Adding SSR authentication with Supabase 01:02:55
- [x] App sidebar and Internal pages 01:36:55
- [x] Image generation using Replicate API 02:04:40
- [x] Storing image in Supabase 03:26:55
- [x] Create Image gallery component 03:56:40

- [ ] Flux model Training 04:49:22

  - Last viewed: https://youtu.be/7AQNeii5K7E?t=20696 (Handle model creation with Replicate API)

- [ ] Implementing Webhook 05:52:34
- [ ] Render all models 06:13:36
- [ ] Using our custom model to generate images 07:20:15
- [ ] Adding billing/subscription functionality using stripe 07:39:17
- [ ] Stripe setup 07:46:00
- [ ] Creating Pricing component 08:18:22
- [ ] Adding credits functionality 09:22:30
- [ ] Creating Account Settings page 10:47:05
- [ ] Adding Reset password functionality 11:02:35
- [ ] Creating Dashboard page 11:19:50
- [ ] Adding Landing page 11:49:50
- [ ] Making it mobile responsive 12:59:45

---

### Documentation Guides

- Supabase Auth: Email Verification link Changed from Supabase Dashboard

  - "{{ .SiteURL }}/verify?token_hash={{ .TokenHash }}&type=signup"

- Supabase Tables:

  - Created 'generated_images' table
  - Added RLS Policies for 'generated_images' table

- Supabase Storage:

  - Created 'generated_images' bucket
  - Created policies for 'generated_images' bucket
  - Create 'training_data' bucket

- Next Config
  - Update protocol for supabase hostname with projectID

## Todo List

[ ] Convert native API routes to Hono
