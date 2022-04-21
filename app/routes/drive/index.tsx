import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getFiles, auth, deleteFile } from "~/models/drive.server";

type LoaderData = {
    // this is a handy way to say: "posts is whatever type getPosts resolves to"
    files: Awaited<ReturnType<typeof getFiles>>;
};

export const loader = async () => {
    var client = await auth();
    return json<LoaderData>({
        files: await getFiles(client),
    });
};

export async function action({ request }) {
    var client = await auth();
    const body = await request.formData();
    let { _action, ...values } = Object.fromEntries(body);
    const resp = await deleteFile(client, values.id);
    return redirect('/drive');
}

export default function Posts() {
    const { files } = useLoaderData() as LoaderData;
    
    if (!files) {
        return <h1>No Files!</h1>
    }

    return (
        <main>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <span>
                            <img src={file.thumbnailLink} style={{ display: "inline" }}></img>
                        </span>
                        <span>
                            { file.name } 
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Form method="post" style={{ display: "inline" }}>
                            <input type="hidden" name="id" value={file.id}/>
                            <button type="submit" name="_action" value="delete" className="text-red-600 underline">Delete</button>
                        </Form>
                    </li>
                ))}
            </ul>
        </main>
    );
}
