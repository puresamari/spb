
///////////////////////////////////////////////////////
// Option 2: Import just the parts you need.
// import * as THREE from 'three';
// import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import * as asdf from "fast-sha256";


export default function init() {
  console.log(asdf);
  const d = new Uint8Array([21,31]);
 
  const h = new asdf.HMAC(d); // also Hash and HMAC classes
  const mac = h.update(d).digest();

}