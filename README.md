# Screenshotter - Screenshot as a Service

Serverless service that generates dynamic screenshots on demand.


## Usage

| parameter | type | description |
| --------- | ---- | ----------- |
| `url` | `string` | **Required**<br/>e.g. `https://wikipedia.org` |
| `selector` | `string` | **css selector**<br/>e.g. `.central-featured` |
| `size` | `string` | **viewport size**<br/>default: `1024,768` |
| `full` | `boolean` | **screenshot full page**<br/>default: `false` |
| `ua` | `string` | **user agent**<br/>e.g. `Googlebot/2.1 (+http://www.google.com/bot.html)` |
| `css` | `string` | **custom css**<br/>e.g. `body{background:lightyellow}` |

### Example

```
/screenshot
  ?url=https%3A%2F%2Fcnn.com                # https://cnn.com
  &size=375,812                             # iPhone X Screen Size
  &ua=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2012_0%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F12.0%20Mobile%2F15E148%20Safari%2F604.1
                                            # iPhone XR User Agent
  &selector=article                         # CSS Selector
  &css=article%7Bbackground%3Alightyellow%3Bpadding%3A5px%3Bborder%3A5px%20solid%20gray%3B%7D
                                            # article{background:lightyellow;padding:5px;border:5px solid gray;}
```

[Preview](https://screenshotter.vercel.app/screenshot?url=https%3A%2F%2Fcnn.com&size=375,812&ua=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2012_0%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F12.0%20Mobile%2F15E148%20Safari%2F604.1&selector=article&css=article%7Bbackground%3Alightyellow%3Bpadding%3A5px%3Bborder%3A5px%20solid%20gray%3B%7D)
[![Preview](https://screenshotter.vercel.app/screenshot?url=https%3A%2F%2Fcnn.com&size=375,812&ua=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2012_0%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F12.0%20Mobile%2F15E148%20Safari%2F604.1&selector=article&css=article%7Bbackground%3Alightyellow%3Bpadding%3A5px%3Bborder%3A5px%20solid%20gray%3B%7D)](https://screenshotter.vercel.app/screenshot?url=https%3A%2F%2Fcnn.com&size=375,812&ua=Mozilla%2F5.0%20(iPhone%3B%20CPU%20iPhone%20OS%2012_0%20like%20Mac%20OS%20X)%20AppleWebKit%2F605.1.15%20(KHTML%2C%20like%20Gecko)%20Version%2F12.0%20Mobile%2F15E148%20Safari%2F604.1&selector=article&css=article%7Bbackground%3Alightyellow%3Bpadding%3A5px%3Bborder%3A5px%20solid%20gray%3B%7D)


## Why use this service?

The short answer is that it would take a long time to painstakingly design and run a screenshot service.

That's where `screenshotter.vercel.app` comes in. You can simply pass the url and custom options to our service and it will return screenshots for you on the fly!


## License

- [MIT](https://wei.mit-license.org/) - [@wei](https://github.com/wei)
- [MIT](https://github.com/vercel/og-image/blob/main/LICENSE) - [@vercel](https://github.com/vercel)
