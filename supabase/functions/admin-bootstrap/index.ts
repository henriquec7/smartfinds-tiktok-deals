import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

  const results: any[] = [];

  // 1. Create admindavi
  const newEmail = "admindavi@gmail.com";
  const newPass = "Dav!@2207";
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: newEmail,
    password: newPass,
    email_confirm: true,
  });

  let daviId: string | null = created?.user?.id ?? null;
  if (createErr) {
    // maybe exists already, lookup
    const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const found = list?.users.find((u) => u.email === newEmail);
    if (found) {
      daviId = found.id;
      const { error: upErr } = await admin.auth.admin.updateUserById(found.id, {
        password: newPass,
        email_confirm: true,
      });
      results.push({ step: "davi-update-existing", error: upErr?.message ?? null });
    } else {
      results.push({ step: "davi-create", error: createErr.message });
    }
  } else {
    results.push({ step: "davi-create", id: daviId });
  }

  if (daviId) {
    const { error: roleErr } = await admin
      .from("user_roles")
      .upsert({ user_id: daviId, role: "admin" }, { onConflict: "user_id,role" });
    results.push({ step: "davi-role", error: roleErr?.message ?? null });
  }

  // 2. Update adminhenrique password
  const henriqueEmail = "adminhenrique@gmail.com";
  const henriquePass = "Carl@os*0206";
  const { data: list2 } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  const henrique = list2?.users.find((u) => u.email === henriqueEmail);
  if (henrique) {
    const { error: upErr } = await admin.auth.admin.updateUserById(henrique.id, {
      password: henriquePass,
      email_confirm: true,
    });
    results.push({ step: "henrique-update", error: upErr?.message ?? null });

    const { error: roleErr } = await admin
      .from("user_roles")
      .upsert({ user_id: henrique.id, role: "admin" }, { onConflict: "user_id,role" });
    results.push({ step: "henrique-role", error: roleErr?.message ?? null });
  } else {
    results.push({ step: "henrique-update", error: "user not found" });
  }

  return new Response(JSON.stringify({ results }), {
    headers: { "content-type": "application/json" },
  });
});