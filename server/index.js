const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path')
const swig = require('swig');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/template")

app.use(userAgent);

router.get('/', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    if (!ctx.userAgent.isMobile) {
        let template = swig.compileFile(path.resolve(templateRoot, "auth.html"));
        ctx.body = template({})
    } else {
        let template = swig.compileFile(path.resolve(templateRoot, "auth_phone.html"));
        ctx.body = template({})
    }
});

router.get('/register', function(ctx, next){
    ctx.cookies.set("landing", ctx.request.query.landing, {
        httpOnly: false,
    })
    if (!ctx.userAgent.isMobile) {
        let template = swig.compileFile(path.resolve(templateRoot, "auth.html"));
        ctx.body = template({})
    } else {
        let template = swig.compileFile(path.resolve(templateRoot, "auth_phone.html"));
        ctx.body = template({})
    }
});

router.get('/newpsd', function(ctx, next){
    if (!ctx.userAgent.isMobile) {
        let template = swig.compileFile(path.resolve(templateRoot, "newpsd.html"));
        ctx.body = template({})
    } else {
        let template = swig.compileFile(path.resolve(templateRoot, "newpsd_phone.html"));
        ctx.body = template({})
    }
});

router.get('/reset', function(ctx, next){
    if (!ctx.userAgent.isMobile) {
        let template = swig.compileFile(path.resolve(templateRoot, "newpsd.html"));
        ctx.body = template({})
    } else {
        let template = swig.compileFile(path.resolve(templateRoot, "newpsd_phone.html"));
        ctx.body = template({})
    }
});

router.get('/success', function(ctx, next){
        let template = swig.compileFile(path.resolve(templateRoot, "newpsd_phone.html"));
        ctx.body = template({})
});

router.get(/^\/static(?:\/|$)/, async(ctx) => {
<<<<<<< HEAD
    let filepath = ctx.path.replace(/static\//, "")
    await send(ctx, filepath, {
        root: path.join(__dirname, "../dist")
    });
=======
    let filepath = ctx.path.replace(/static\//,"")
     await send(ctx, filepath.path, {
         root: path.join(__dirname, "../dist")
     });
>>>>>>> 37d060ea9ae9a1f1da4da49edfdf06c020b89e51
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening on port 3000');
