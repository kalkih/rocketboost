# 🚀 &nbsp; Rocketboost &nbsp; [![Travis](https://img.shields.io/travis/kalkih/rocketboost.svg?style=flat-square)](https://travis-ci.org/kalkih/rocketboost)

Rocket launch tracking PWA built with VueJS, VueX & ❤️

## [Live version](https://rocket.karls.app)

## Project setup

```
npm install
```

### Compile & hot-reload for development

```
npm run serve
```

### Compile & minify for production

```
npm run build
```

### Lint & fix errors

```
npm run lint
```

### Test push notifications

```
npm run build:watch
```

and

```
npm run serve:dist
```

Go into DevTools -> "Applications" -> "Service Workers" and send a push from there with a JSON object. e.g.

```json
{ "title": "Test message", "body": "This is a test message", "topic": "launch", "id": "2068" }
```

## Configuration

Copy the base environment and edit the .local copy

```
cp .env.production .env.production.local
```

### Example environment

```env
VUE_APP_API_URL=https://api.example.app
VUE_APP_API_VAPID_PUBLIC_KEY=BIMSlo01XNTmTFT0rcrMluhMl0Vbls-t6DAXtbRBiFW_z_n9kF9KlxsEiyujlAEZhDDEJsxMlMxT86_OXxKNQeU
BASE_URL=https://example.app
```

## License

This project is under the MIT license.
