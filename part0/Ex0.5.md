```mermaid
flowchart TD
    OpenSPA[User opens the SPA at https://studies.cs.helsinki.fi/exampleapp/spa] --> LoadHTML[Browser loads the HTML page]
    LoadHTML --> GetCSS[Browser requests the CSS file]
    GetCSS --> GetJS[Browser requests the JavaScript file]
    GetJS --> ExecuteJS[JavaScript executes and fetches note data]
    ExecuteJS --> RequestData[Browser asks server for note data]
    RequestData --> ReceiveData[Server sends the note data as JSON]
    ReceiveData --> RenderUI[Browser updates the UI with the notes]
    RenderUI --> ShowNotes[Notes are now visible in the app]
