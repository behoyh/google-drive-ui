# Google Drive Service Account UI

Helps visualize files locally in a Google Drive service account. Currently only thumbnail, name, and delete functions are supported. This project was built using [Remix](https://remix.run).

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
    "key": 
        {
            "private_key_id": "YOUR PRIVATE KEY ID",
            "private_key": "YOUR PRIVATE KEY",
            "client_email": "YOUR CLIENT EMAIL",
            "client_id": "YOUR CLIENT ID"
        } 
  }
  ```
