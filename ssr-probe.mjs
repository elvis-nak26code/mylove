import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'
import { createElement as h } from 'react'
import React from 'react'

try { Object.defineProperty(globalThis, 'navigator', { value: { userAgent: 'node' }, configurable: true, writable: true }) } catch {}
try { Object.defineProperty(globalThis, 'window', { value: { innerWidth:1024, innerHeight:768, addEventListener(){}, removeEventListener(){}, matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}), devicePixelRatio:1 }, configurable:true, writable:true }) } catch {}
try { Object.defineProperty(globalThis, 'document', { value: { createElement:()=>({getContext:()=>({}),setAttribute(){},style:{},width:0,height:0}), documentElement:{}, addEventListener(){}, removeEventListener(){}, querySelector:()=>null }, configurable:true, writable:true }) } catch {}
try { Object.defineProperty(globalThis, 'matchMedia', { value: () => ({ matches:false, addEventListener(){}, removeEventListener(){} }), configurable:true }) } catch {}

const vite = await createServer({ server:{ middlewareMode:true }, appType:'custom', logLevel:'error' })
for (const p of ['Memories', 'InteractiveStar', 'MemoryCard']) {
  try {
    const mod = await vite.ssrLoadModule(`/src/${/Star|Card/.test(p) ? 'components/' : 'pages/'}${p}.jsx`)
    const Comp = mod.default
    const out = renderToString(h(Comp))
    console.log(`OK  ${p}: render ok (${out.length} chars)`)
  } catch (e) {
    console.log(`FAIL ${p}:`)
    console.log('  ' + (e && e.message ? e.message : String(e)).split('\n').slice(0,6).join('\n  '))
    const stack = e && e.stack ? e.stack.split('\n').filter(l=>l.includes('src/')).slice(0,4) : []
    if (stack.length) console.log('  ' + stack.join('\n  '))
  }
}
await vite.close()
