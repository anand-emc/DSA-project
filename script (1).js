const $=id=>document.getElementById(id);
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));t.classList.add('active');$(t.dataset.section).classList.add('active')}));
$('themeBtn').onclick=()=>{document.body.classList.toggle('dark');$('themeBtn').textContent=document.body.classList.contains('dark')?'🌙':'☀️'};

let stack=[],queue=[],list=[];
function stackRender(){ $('stackView').innerHTML=stack.length?stack.map((v,i)=>`<div class="node">${escapeHtml(v)}${i===stack.length-1?' <small>← TOP</small>':''}</div>`).join(''):'<span style="color:var(--muted)">Stack is empty</span>'; $('stackTop').textContent=stack.at(-1)??'—';$('stackSize').textContent=stack.length}
function stackPush(){let v=$('stackInput').value.trim();if(!v)return;stack.push(v);$('stackInput').value='';stackRender()}
function stackPop(){if(!stack.length)return;stack.pop();stackRender()}function stackClear(){stack=[];stackRender()}
function queueRender(){ $('queueView').innerHTML=queue.length?queue.map((v,i)=>`<div class="node">${escapeHtml(v)}</div>${i<queue.length-1?'<span class="arrow">→</span>':''}`).join(''):'<span style="color:var(--muted)">Queue is empty</span>'; $('queueFront').textContent=queue[0]??'—';$('queueRear').textContent=queue.at(-1)??'—';$('queueSize').textContent=queue.length}
function enqueue(){let v=$('queueInput').value.trim();if(!v)return;queue.push(v);$('queueInput').value='';queueRender()}function dequeue(){if(!queue.length)return;queue.shift();queueRender()}function queueClear(){queue=[];queueRender()}
function listRender(){ $('listView').innerHTML=list.length?list.map((v,i)=>`<div class="node">${escapeHtml(v)}</div>${i<list.length-1?'<span class="arrow">→</span>':''}`).join(''):'<span style="color:var(--muted)">Linked list is empty</span>'}
function listInsert(){let v=$('listInput').value.trim();if(!v)return;list.unshift(v);$('listInput').value='';listRender()}function listDelete(){if(list.length){list.shift();listRender()}}function listClear(){list=[];listRender()}
let bst=null;
function makeNode(v){return {v,left:null,right:null}}
function insert(n,v){if(!n)return makeNode(v);if(v<n.v)n.left=insert(n.left,v);else if(v>n.v)n.right=insert(n.right,v);return n}
function treeHTML(n){if(!n)return '';return `<li><span class="tree-node">${n.v}</span>${(n.left||n.right)?`<div class="children"><ul>${treeHTML(n.left)||'<li></li>'}</ul><ul>${treeHTML(n.right)||'<li></li>'}</ul></div>`:''}</li>`}
function bstRender(){ $('bstView').innerHTML=bst?`<ul>${treeHTML(bst)}</ul>`:'<span style="color:var(--muted)">Tree is empty</span>'}
function bstInsert(){let v=Number($('bstInput').value);if(!Number.isFinite(v))return;bst=insert(bst,v);$('bstInput').value='';$('bstMessage').textContent=`Inserted ${v} into the Binary Search Tree.`;bstRender()}
function contains(n,v){if(!n)return false;if(n.v===v)return true;return v<n.v?contains(n.left,v):contains(n.right,v)}
function bstSearch(){let v=Number($('bstInput').value);if(!Number.isFinite(v))return;$('bstMessage').textContent=contains(bst,v)?`${v} was found in the tree.`:`${v} was not found in the tree.`}
function bstClear(){bst=null;$('bstMessage').textContent='Insert values to build your tree.';bstRender()}
let originalArray=[],arr=[];
function generateArray(){arr=Array.from({length:12},()=>Math.floor(Math.random()*90)+10);originalArray=[...arr];renderArray();$('algoMessage').textContent='Array generated. Choose an algorithm and press Run.'}
function resetArray(){arr=[...originalArray];renderArray();$('algoMessage').textContent='Array reset.'}
function renderArray(active=-1){$('arrayView').innerHTML=arr.length?arr.map((v,i)=>`<div class="bar ${i===active?'active':''}" style="height:${Math.max(25,v*2)}px"><b>${v}</b></div>`).join(''):'<span style="color:var(--muted)">Click Generate Array</span>'}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function runAlgorithm(){if(!arr.length)generateArray();let type=$('algoSelect').value;if(type==='linear'||type==='binary'){let target=Number($('searchInput').value);if(!Number.isFinite(target)){ $('algoMessage').textContent='Enter a search value.';return} if(type==='binary')arr.sort((a,b)=>a-b);let found=-1;if(type==='linear'){for(let i=0;i<arr.length;i++){renderArray(i);await sleep(250);if(arr[i]===target){found=i;break}}}else{let l=0,r=arr.length-1;while(l<=r){let m=Math.floor((l+r)/2);renderArray(m);await sleep(350);if(arr[m]===target){found=m;break}if(arr[m]<target)l=m+1;else r=m-1}}$('algoMessage').textContent=found>=0?`${target} found at index ${found}.`:`${target} not found.`;renderArray(found);return}
for(let i=0;i<arr.length;i++){for(let j=0;j<arr.length-i-1;j++){if(type==='bubble'&&arr[j]>arr[j+1]){[arr[j],arr[j+1]]=[arr[j+1],arr[j]]}else if(type==='selection'){let m=j;for(let k=j+1;k<arr.length;k++)if(arr[k]<arr[m])m=k;[arr[j],arr[m]]=[arr[m],arr[j]]}else if(type==='insertion'){let key=arr[j],k=j-1;while(k>=0&&arr[k]>key){arr[k+1]=arr[k];k--;renderArray(k+1);await sleep(80)}arr[k+1]=key}renderArray(j);await sleep(100)}}$('algoMessage').textContent=`${document.querySelector('#algoSelect option:checked').textContent} completed.`;renderArray()}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
stackRender();queueRender();listRender();bstRender();generateArray();
