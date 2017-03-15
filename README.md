# url-shortener-microservice
URL shortener microservice based on Node.js/Express/MongoDB

1) I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2) If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3) When I visit that shortened URL, it will redirect me to my original link.

Example usage:
```
https://little-url.herokuapp.com/new/https://www.google.com

https://little-url.herokuapp.com/new/http://foo.com:80

```

Example output:
```
{ "original_url":"http://foo.com:80", "short_url":"https://little-url.herokuapp.com/8170" }
```

Usage
```
https://little-url.herokuapp.com/8170
```

Will redirect to
```
http://foo.com:80
```