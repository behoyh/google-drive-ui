import type { MetaFunction } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import React from "react";
import { ServerConfig } from "../models/config.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Google Drive UI" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }) {
  const body = await request.formData();
  let { _action, ...values } = Object.fromEntries(body);
  const conf = ServerConfig.setConfig(values.config);
  return redirect('/drive/');
}

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <h1>Paste key json:</h1>
        <Form method="post">
          <pre><code>
            <textarea name="config" rows={20} cols={100} style={{ borderColor: 'tomato', borderWidth: 'medium' }} >
            </textarea>
          </code></pre>
          <br />
          <button type="submit" name="_action" value="add" className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">Save</button>
        </Form>
      </div>
    </main>
  );
}
