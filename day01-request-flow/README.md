```mermaid
flowchart TD
    A[User enters URL in browser] --> B[Browser parses URL and checks DNS]
    B --> C[DNS resolves domain to IP address]
    C --> D[Browser opens TCP connection to server]
    D --> E[Browser sends HTTP GET request]
    E --> F[Server receives request and runs backend logic]
    F --> G[Server queries database (optional)]
    G --> H[Server sends back HTTP response]
    H --> I[Browser receives response and renders page]
```
