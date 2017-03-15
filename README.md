# url-shortener-microservice
URL shortener microservice based on Node.js/Express/MongoDB

1) I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2) If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3) When I visit that shortened URL, it will redirect me to my original link.

Example usage:
```
https://blooming-castle-13896.herokuapp.com/https://www.google.com

https://blooming-castle-13896.herokuapp.com/http://foo.com:80

```

Example output:
```
{ "original_url":"http://foo.com:80", "short_url":"https://blooming-castle-13896.herokuapp.com/4711" }
```

Usage
```
https://blooming-castle-13896.herokuapp.com/4711
```

Will redirect to
```
http://foo.com:80
```