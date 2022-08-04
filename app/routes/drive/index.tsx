import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getFiles, getStorageQuota, auth, deleteFile } from "~/models/drive.server";

type LoaderData = {
    // this is a handy way to say: "posts is whatever type getPosts resolves to"
    files: Awaited<ReturnType<typeof getFiles>>;
    storageQuota: Awaited<ReturnType<typeof getStorageQuota>>
};

export const loader = async () => {
    var client = await auth();
    return json<LoaderData>({
        files: await getFiles(client),
        storageQuota: await getStorageQuota(client),
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
    const { files, storageQuota } = useLoaderData() as LoaderData;
    
    if (!files) {
        return <h1>No Files!</h1>
    }

    return (
        <main>
            <div className="grid grid-cols-1 gap-4 text-dark text-center">
                <h2 className="p-4">{(storageQuota.usage / 1000000).toFixed(2)}MB used of {(storageQuota.limit / 1000000).toFixed(2)}</h2>
            </div>
            <div className="grid grid-cols-4 gap-4 font-mono text-dark text-sm text-center font-bold leading-6">
                {files.map((file) => (
                    <div className="p-4 rounded-lg" key={file.id}>
                        <div className="block">
                            <img src={file.thumbnailLink} style={{ display: "inline" }}></img>
                        </div>
                        <div className="inline-block">
                            { file.name } 
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Form method="post" style={{ display: "inline" }}>
                            <input type="hidden" name="id" value={file.id}/>
                            <button type="submit" name="_action" value="delete" className="text-red-600 underline">Delete</button>
                        </Form>
                    </div>
                ))}
            </div>
        </main>
    );
}
