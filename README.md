# Google Drive Service Account UI

Helps visualize files in a Google Drive service account locally. Currently only quota, thumbnail, name, and delete functions are supported. This project was built using [Remix](https://remix.run).

### Usage
- Install
  ```sh
  npm install
  ```
- Start dev server:

  ```sh
  npm run dev
  ```
- Copy **.json** key file (including surrounding brackets) into the textbox at [localhost:3000](localhost:3000) and click `Save`
  ```
        {
            "private_key_id": "YOUR PRIVATE KEY ID",
            "private_key": "YOUR PRIVATE KEY",
            "client_email": "YOUR CLIENT EMAIL",
            "client_id": "YOUR CLIENT ID"
        } 
  ```
