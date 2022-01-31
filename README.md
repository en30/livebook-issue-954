# Livebook Issue #954

This is a repository to reproduce the behavior described in
https://github.com/livebook-dev/livebook/issues/954

## Step to reproduce

1. `docker-compose up`

- this launches livebook and proxy server which only proxies request with `Cookie: ok=1`

2. open `http://localhost:3000` with a browser

- this shows `blocked` because cookies is not set

3. open browser console and `document.cookie = 'ok=1'`
4. reload browser

- now you can see livebook

5. enter token extracted from stdout
6. Open the "Introduction to Kino" notebook and run `Kino.DataTable` section
