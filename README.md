# redwood-minimal
based on redwoodjs/sdk/starters/minimal

### scripts
```
dev: vite dev,
build: RWSDK_DEPLOY=1 vite build,
preview: vite preview,
ship: wrangler deploy,
types: wrangler types --include-runtime false
```

### Notes
- `RWSDK_DEPLOY=1` prevents the rwsdk/vite plugin from calling `npm run dev:init`




### Further Reading
- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers)
