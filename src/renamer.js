'use strict';

const keywords = new Set('and break do else elseif end false for function if in local nil not or repeat return then true until while continue self'.split(/\s+/));

function pairs(text) {
  const result = {};
  for (const item of text.trim().split(/\s+/)) {
    const at = item.indexOf('=');
    if (at > 0) result[item.slice(0, at)] = item.slice(at + 1);
  }
  return result;
}

const libmethods = pairs(`
math.random=MathRandom math.randomseed=MathRandomSeed math.floor=MathFloor math.ceil=MathCeil math.abs=MathAbs math.clamp=MathClamp math.min=MathMin math.max=MathMax math.rad=MathRad math.deg=MathDeg math.sqrt=MathSqrt math.sin=MathSin math.cos=MathCos math.tan=MathTan math.asin=MathAsin math.acos=MathAcos math.atan=MathAtan math.atan2=MathAtan2 math.sinh=MathSinh math.cosh=MathCosh math.tanh=MathTanh math.log=MathLog math.log10=MathLog10 math.exp=MathExp math.pow=MathPow math.frexp=MathFrexp math.ldexp=MathLdexp math.modf=MathModf math.fmod=MathFmod math.noise=MathNoise math.round=MathRound math.sign=MathSign math.lerp=MathLerp math.map=MathMap math.huge=MathHuge math.pi=MathPi math.nan=MathNaN
 table.insert=TableInsert table.remove=TableRemove table.concat=TableConcat table.find=TableFind table.sort=TableSort table.unpack=TableUnpack table.pack=TablePack table.create=TableCreate table.clear=TableClear table.clone=TableClone table.freeze=TableFreeze table.isfrozen=TableIsFrozen table.maxn=TableMaxN table.move=TableMove table.foreach=TableForeach table.foreachi=TableForeachi table.getn=TableGetN
 string.format=StringFormat string.sub=StringSub string.upper=StringUpper string.lower=StringLower string.rep=StringRep string.split=StringSplit string.gsub=StringGsub string.match=StringMatch string.find=StringFind string.gmatch=StringGmatch string.len=StringLen string.byte=StringByte string.char=StringChar string.reverse=StringReverse string.pack=StringPack string.unpack=StringUnpack string.packsize=StringPackSize string.dump=StringDump
 task.wait=TaskWait task.spawn=TaskSpawn task.delay=TaskDelay task.defer=TaskDefer task.cancel=TaskCancel task.synchronize=TaskSync task.desynchronize=TaskDesync
 coroutine.create=CoroutineCreate coroutine.resume=CoroutineResume coroutine.yield=CoroutineYield coroutine.status=CoroutineStatus coroutine.wrap=CoroutineWrap coroutine.running=CoroutineRunning coroutine.isyieldable=CoroutineIsYieldable coroutine.close=CoroutineClose
 os.time=OsTime os.date=OsDate os.clock=OsClock os.difftime=OsDiffTime os.getenv=OsGetEnv
 utf8.char=Utf8Char utf8.codepoint=Utf8CodePoint utf8.len=Utf8Len utf8.offset=Utf8Offset utf8.codes=Utf8Codes utf8.graphemes=Utf8Graphemes
 bit32.band=Bit32Band bit32.bor=Bit32Bor bit32.bxor=Bit32Bxor bit32.bnot=Bit32Bnot bit32.lshift=Bit32LShift bit32.rshift=Bit32RShift bit32.arshift=Bit32ArShift bit32.lrotate=Bit32LRotate bit32.rrotate=Bit32RRotate bit32.btest=Bit32BTest bit32.extract=Bit32Extract bit32.replace=Bit32Replace bit32.countlz=Bit32CountLZ bit32.countrz=Bit32CountRZ
 debug.traceback=DebugTraceback debug.info=DebugInfo debug.getinfo=DebugGetInfo debug.profilebegin=DebugProfileBegin debug.profileend=DebugProfileEnd debug.getmemorycategory=DebugGetMemoryCategory debug.setmemorycategory=DebugSetMemoryCategory debug.resetmemorycategory=DebugResetMemoryCategory debug.upvalues=DebugUpvalues debug.getupvalue=DebugGetUpvalue debug.setupvalue=DebugSetUpvalue debug.getlocal=DebugGetLocal debug.setlocal=DebugSetLocal debug.getregistry=DebugGetRegistry debug.getmetatable=DebugGetMetatable debug.setmetatable=DebugSetMetatable debug.getfenv=DebugGetFenv debug.setfenv=DebugSetFenv debug.sethook=DebugSetHook debug.gethook=DebugGetHook debug.debug=DebugDebug debug.getuservalue=DebugGetUserValue debug.setuservalue=DebugSetUserValue
 buffer.create=BufferCreate buffer.fromstring=BufferFromString buffer.tostring=BufferToString buffer.len=BufferLen buffer.copy=BufferCopy buffer.fill=BufferFill buffer.readi8=BufferReadI8 buffer.readu8=BufferReadU8 buffer.readi16=BufferReadI16 buffer.readu16=BufferReadU16 buffer.readi32=BufferReadI32 buffer.readf32=BufferReadF32 buffer.readf64=BufferReadF64 buffer.writei8=BufferWriteI8 buffer.writeu8=BufferWriteU8 buffer.writei16=BufferWriteI16 buffer.writeu16=BufferWriteU16 buffer.writei32=BufferWriteI32 buffer.writef32=BufferWriteF32 buffer.writef64=BufferWriteF64
 vector.create=VectorCreate vector.magnitude=VectorMagnitude vector.normalize=VectorNormalize vector.cross=VectorCross vector.dot=VectorDot vector.angle=VectorAngle vector.floor=VectorFloor vector.ceil=VectorCeil vector.abs=VectorAbs vector.sign=VectorSign vector.clamp=VectorClamp vector.min=VectorMin vector.max=VectorMax vector.zero=VectorZero vector.one=VectorOne vector.xAxis=VectorXAxis vector.yAxis=VectorYAxis vector.zAxis=VectorZAxis
 json.encode=JsonEncode json.decode=JsonDecode
 bit.band=BitBand bit.bor=BitBor bit.bxor=BitBxor bit.bnot=BitBnot bit.lshift=BitLShift bit.rshift=BitRShift bit.arshift=BitArShift bit.rol=BitRol bit.ror=BitRor bit.bswap=BitBswap bit.tohex=BitToHex
`);

const globalfunctions = pairs(`
pcall=PcallOk xpcall=XpcallOk assert=Asserted type=TypeName typeof=TypeName tostring=ToString tonumber=ToNumber ipairs=IPairsIterator pairs=PairsIterator next=NextItem select=Selected unpack=Unpacked rawget=RawValue rawset=RawTable rawequal=RawEqual rawlen=RawLength getmetatable=Metatable setmetatable=WithMetatable newproxy=NewProxy require=Module collectgarbage=Collected loadstring=LoadedFunction load=LoadedFunction getfenv=GetFenv setfenv=SetFenv getgenv=GetGenv getsenv=GetScriptEnv getrenv=GetRobloxEnv getreg=GetRegistry getmenv=GetModuleEnv error=ErrorMessage tick=Tick time=Time elapsedTime=ElapsedTime wait=Elapsed spawn=Thread delay=Thread settings=Settings stats=Stats print=Printed warn=Warned IsA=IsType writefile=WriteFile readfile=ReadFile appendfile=AppendFile makefolder=MakeFolder delfile=DeleteFile delfolder=DeleteFolder listfiles=ListFiles isfile=IsFile isfolder=IsFolder loadfile=LoadFile dofile=DoFile getupvalue=GetUpvalue getupvalues=GetUpvalues setupvalue=SetUpvalue upvalues=Upvalues getrawmetatable=GetRawMetatable setrawmetatable=SetRawMetatable hookfunction=HookFunction hookmetamethod=HookMetamethod getnamecallmethod=GetNamecallMethod setnamecallmethod=SetNamecallMethod checkcaller=CheckCaller islclosure=IsLClosure iscclosure=IsCClosure newcclosure=NewCClosure clonefunction=CloneFunction restorefunction=RestoreFunction getfunctionhash=GetFunctionHash getconstant=GetConstant getconstants=GetConstants getgc=GetGC getinstances=GetInstances getnilinstances=GetNilInstances getscripts=GetScripts getloadedmodules=GetLoadedModules getrunningscripts=GetRunningScripts fireclickdetector=FireClickDetector firetouchinterest=FireTouchInterest fireproximityprompt=FireProximityPrompt firesignal=FireSignal getconnections=GetConnections getcustomasset=GetCustomAsset getcallbackvalue=GetCallbackValue getrenderstepped=GetRenderStepped getheartbeat=GetHeartbeat getstepped=GetStepped identifyexecutor=IdentifyExecutor getexecutorname=GetExecutorName getscriptbytecode=GetScriptBytecode getscripthash=GetScriptHash getscriptclosure=GetScriptClosure getscriptfromthread=GetScriptFromThread request=Request httprequest=HttpRequest synrequest=SynRequest setclipboard=SetClipboard toclipboard=ToClipboard mouse1click=Mouse1Click mouse1press=Mouse1Press mouse1release=Mouse1Release mouse2click=Mouse2Click mouse2press=Mouse2Press mouse2release=Mouse2Release mousemoveabs=MouseMoveAbs mousemoverel=MouseMoveRel mousescroll=MouseScroll getmouseposition=GetMousePosition getmousestate=GetMouseState keypress=KeyPress keyrelease=KeyRelease keytap=KeyTap iskeydown=IsKeyDown iskeypressed=IsKeyPressed getrenderproperty=GetRenderProperty setrenderproperty=SetRenderProperty setfflag=SetFFlag getfflag=GetFFlag getthreadidentity=GetThreadIdentity setthreadidentity=SetThreadIdentity getidentity=GetIdentity setidentity=SetIdentity getcallingscript=GetCallingScript decompile=Decompile setreadonly=SetReadOnly isreadonly=IsReadOnly isexecutorclosure=IsExecutorClosure isexecutor=IsExecutor getactors=GetActors gethui=GetHui getimmersivemode=GetImmersiveMode setimmersivemode=SetImmersiveMode isrenderobj=IsRenderObj cleardrawcache=ClearDrawCache drawingnew=DrawingNew getscriptsource=GetScriptSource getmenv2=GetModuleEnv2 getscriptthread=GetScriptThread getthreads=GetThreads getproperties=GetProperties getattributes=GetAttributes getsignals=GetSignals getprotos=GetProtos getupvals=GetUpvalues getrawproperty=GetRawProperty setrawproperty=SetRawProperty gethiddenproperty=GetHiddenProperty sethiddenproperty=SetHiddenProperty setcallbackvalue=SetCallbackValue writecustomasset=WriteCustomAsset
`);

const methodnames = pairs(`
Wait=Elapsed Connect=Connection Once=Connection ConnectParallel=Connection Clone=Clone Destroy=Destroyed ClearAllChildren=Cleared GetChildren=Children GetDescendants=Descendants GetPlayers=PlayerList GetTagged=Tagged GetInstanceAddedSignal=Signal GetInstanceRemovedSignal=Signal GetDataStore=DataStore GetOrderedDataStore=OrderedDataStore GetGlobalDataStore=GlobalDataStore GetCollisionGroupId=GroupId GetCollisionGroupName=GroupName CreatePath=Path Create=Created CreateWindow=Window JSONEncode=Json JSONDecode=Decoded HttpGetAsync=Response HttpPostAsync=Response HttpGet=Response HttpPost=Response PostAsync=Response RequestAsync=Response GenerateGUID=Guid GetAsync=Value SetAsync=Value UpdateAsync=Value IncrementAsync=Value Kick=Kicked GetMouse=Mouse GetPropertyChangedSignal=Signal GetAttributeChangedSignal=Signal GetAttribute=Value SetAttribute=Attribute GetPivot=Pivot PivotTo=Pivot GetFullName=FullName GetDebugId=DebugId FindFirstAncestor=Ancestor FindFirstAncestorOfClass=Ancestor FindFirstAncestorWhichIsA=Ancestor IsA=IsType AddTag=Tag RemoveTag=Tag HasTag=HasTag GetTags=Tags WaitForChild=Child FindFirstChild=Child FindFirstChildOfClass=Child FindFirstChildWhichIsA=Child SetPrimaryPartCFrame=Pivot GetPrimaryPartCFrame=Pivot MoveTo=Pivot LoadCharacter=Character LoadCharacterWithHumanoidDescription=Character GetRankInGroup=Rank GetRoleInGroup=Role IsInGroup=IsInGroup IsFriendsWith=IsFriend GetFriendsAsync=Friends GetUserIdFromNameAsync=UserId GetNameFromUserIdAsync=UserName GetUserThumbnailAsync=Thumbnail GetProductInfo=ProductInfo UserOwnsGamePassAsync=OwnsGamePass PromptGamePassPurchase=Prompt PromptProductPurchase=Prompt PromptPurchase=Prompt GetDeveloperProductsAsync=Products GetStorePages=Pages GetService=Service
`);

const signalparams = {
  playeradded: ['Player'], playerremoving: ['Player'], characteradded: ['Character'], characterremoving: ['Character'], characterappearanceloaded: ['Character'],
  inputbegan: ['Input', 'GameProcessed'], inputended: ['Input', 'GameProcessed'], inputchanged: ['Input', 'GameProcessed'],
  touchstarted: ['Touch', 'GameProcessed'], touchended: ['Touch', 'GameProcessed'], touchmoved: ['Touch', 'GameProcessed'], touchtap: ['TouchPositions', 'GameProcessed'],
  heartbeat: ['DeltaTime'], renderstepped: ['DeltaTime'], stepped: ['Time', 'DeltaTime'], touched: ['Hit'], childadded: ['Child'], childremoved: ['Child'],
  descendantadded: ['Descendant'], descendantremoving: ['Descendant'], ancestrychanged: ['Child', 'Parent'], attributechanged: ['Property'], changed: ['Property'],
  healthchanged: ['Health'], statechanged: ['OldState', 'NewState'], running: ['Speed'], swimming: ['Speed'], climbing: ['Speed'], triggered: ['Player'],
  triggerended: ['Player'], mouseclick: ['Player'], rightmouseclick: ['Player'], mousehoverenter: ['Player'], mousehoverleave: ['Player'],
  onserverevent: ['Player'], onserverinvoke: ['Player'], focuslost: ['EnterPressed', 'InputObject'], dragstart: ['Player', 'CursorRay', 'ViewFrame'],
  dragcontinue: ['Player', 'CursorRay', 'ViewFrame'], dragend: ['Player'],
};

const singularmap = {
  PlayerList: 'Player', Players: 'Player', Children: 'Child', Descendants: 'Descendant', Tags: 'Tag', Tagged: 'TaggedInstance', Products: 'Product', Pages: 'Page',
  Friends: 'Friend', ListFiles: 'FilePath', GetConnections: 'Connection', GetInstances: 'Inst', GetNilInstances: 'NilInst', GetScripts: 'ScriptObj',
  GetRunningScripts: 'RunningScript', GetLoadedModules: 'LoadedModule', GetGC: 'GcObj', GetActors: 'Actor', GetThreads: 'ThreadObj', GetPlayingAnimationTracks: 'AnimationTrack',
  GetConnectedParts: 'ConnectedPart', GetJoints: 'Joint', GetAttributes: 'AttributeValue', GetProperties: 'PropertyValue',
};

const genericUrlSegments = new Set('http https www com org net io gg me dev menu xyz github githubusercontent raw gist gitlab bitbucket pastebin hastebin paste sirius luarmor api cdn main master heads refs tags blob tree releases release latest download downloads source src dist build out bin lib library init index loader load script scripts client server shared modules module packages package assets files file v1 v2 v3 v4 lua luau txt json addons addon plugins'.split(/\s+/));
const reValidIdent = /^[A-Za-z_]\w*$/;
const rePlaceholder1 = /^[a-zA-Z]{1,3}\d+[a-zA-Z0-9_]*$/;
const rePlaceholder2 = /^_*(?:[a-zA-Z]_[a-zA-Z]_?\d+|[a-zA-Z]\d*_\d+|(?:var|arg|upval|func|tbl|tmp|local|param|reg|slot|const|idx|val)_?\d+)$/;
const reUrl = /https?:\/\/([^\s"'`<>\)\]]+)/i;
const reUrlExt = /\.(?:luau|lua|txt|json|min|js)+$/i;
const reNonAlnum = /[^A-Za-z0-9_\-]/g;
const reVerNum = /^v?\d+(?:\.\d+)*$/i;

function normalizeClassName(name) {
  return String(name || '').split(/[\s_-]+/).filter(Boolean).map(item => item[0].toUpperCase() + item.slice(1)).join('');
}

function validIdentifier(value) {
  return reValidIdent.test(value || '');
}

function safeIdent(value) {
  if (!value || !validIdentifier(value) || keywords.has(String(value).toLowerCase())) return null;
  return value;
}

function isPlaceholder(name) {
  if (!name || name === '_') return false;
  return rePlaceholder1.test(name) || rePlaceholder2.test(name);
}

function camel(value) {
  return value ? value[0].toLowerCase() + value.slice(1) : value;
}

function joinSuffix(base, number) {
  return /\d$/.test(base) ? `${base}_${number}` : `${base}${number}`;
}

function inferFromUrl(text) {
  const match = reUrl.exec(text);
  if (!match) return null;
  const body = match[1].split('?')[0].split('#')[0].replace(/[\/.,;:!\)\]}"']+$/, '');
  if (!body.includes('/')) return null;
  const [host, ...pathParts] = body.split('/');
  const cleaned = pathParts.filter(Boolean).map(item => item.replace(reUrlExt, '').replace(reNonAlnum, '')).filter(Boolean);
  if (!cleaned.length) return null;
  const hostLower = host.toLowerCase();
  const gitHost = ['github', 'githubusercontent', 'gitlab', 'bitbucket'].some(item => hostLower.includes(item));
  if (gitHost && cleaned.length >= 2) {
    for (let index = cleaned.length - 1; index >= 2; index -= 1) {
      const item = cleaned[index];
      const lower = item.toLowerCase();
      if (!genericUrlSegments.has(lower) && !/^\d+$/.test(item) && !reVerNum.test(lower)) return safeIdent(normalizeClassName(item));
    }
    if (!genericUrlSegments.has(cleaned[1].toLowerCase()) && !/^\d+$/.test(cleaned[1])) return safeIdent(normalizeClassName(cleaned[1]));
    if (!genericUrlSegments.has(cleaned[0].toLowerCase()) && !/^\d+$/.test(cleaned[0])) return safeIdent(normalizeClassName(cleaned[0]));
  }
  for (let index = cleaned.length - 1; index >= 0; index -= 1) {
    const item = cleaned[index];
    const lower = item.toLowerCase();
    if (!genericUrlSegments.has(lower) && !/^\d+$/.test(item) && !reVerNum.test(lower)) return safeIdent(normalizeClassName(item));
  }
  return null;
}

function readLongBracket(text, index) {
  if (index + 1 >= text.length || text[index] !== '[') return -1;
  let cursor = index + 1;
  let equals = 0;
  while (cursor < text.length && text[cursor] === '=') { equals += 1; cursor += 1; }
  if (text[cursor] !== '[') return -1;
  const close = `]${'='.repeat(equals)}]`;
  const end = text.indexOf(close, cursor + 1);
  return end < 0 ? text.length : end + close.length;
}

function scanBacktick(text, start) {
  let index = start + 1;
  while (index < text.length) {
    if (text[index] === '\\') { index += 2; continue; }
    if (text[index] === '`') return ['done', index + 1];
    if (text[index] === '{') return ['interp', index + 1];
    index += 1;
  }
  return ['done', text.length];
}

function stripComments(text) {
  const output = [];
  let index = 0;
  while (index < text.length) {
    const ch = text[index];
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      const start = index;
      index += 1;
      while (index < text.length && text[index] !== quote) {
        if (text[index] === '\\' && index + 1 < text.length) index += 2;
        else if (quote !== '`' && text[index] === '\n') break;
        else index += 1;
      }
      if (index < text.length && text[index] === quote) index += 1;
      output.push(text.slice(start, index));
      continue;
    }
    if (ch === '-' && text[index + 1] === '-') {
      const longEnd = readLongBracket(text, index + 2);
      if (longEnd >= 0) index = longEnd;
      else {
        const end = text.indexOf('\n', index);
        index = end < 0 ? text.length : end;
      }
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(text, index);
      if (longEnd >= 0) { output.push(text.slice(index, longEnd)); index = longEnd; continue; }
    }
    output.push(ch);
    index += 1;
  }
  return output.join('');
}

function startsWithName(text, name) {
  if (!text || !name) return false;
  const stripped = stripComments(text).replace(/"(?:\\.|[^"\\\n])*"/g, '""').replace(/'(?:\\.|[^'\\\n])*'/g, "''");
  const match = /^\s*([A-Za-z_]\w*)/.exec(stripped);
  return Boolean(match && match[1] === name);
}

function readStatement(code, start) {
  let index = start;
  let depth = 0;
  let blockDepth = 0;
  let exprIfDepth = 0;
  let awaitingDo = false;
  let previous = '=';
  while (index < code.length) {
    const ch = code[index];
    if (' \t\r'.includes(ch)) { index += 1; continue; }
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      index += 1;
      while (index < code.length && code[index] !== quote) {
        if (code[index] === '\\' && index + 1 < code.length) index += 2;
        else if (quote !== '`' && code[index] === '\n') break;
        else index += 1;
      }
      if (index < code.length && code[index] === quote) index += 1;
      previous = 'str';
      continue;
    }
    if (ch === '-' && code[index + 1] === '-') {
      const longEnd = readLongBracket(code, index + 2);
      if (longEnd >= 0) { index = longEnd; continue; }
      const end = code.indexOf('\n', index);
      if (depth === 0 && blockDepth === 0) return [code.slice(start, index), index];
      index = end < 0 ? code.length : end;
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(code, index);
      if (longEnd >= 0) { index = longEnd; previous = 'str'; continue; }
    }
    if ('([{'.includes(ch)) { depth += 1; previous = ch; index += 1; continue; }
    if (')]}'.includes(ch)) {
      if (depth > 0) { depth -= 1; previous = ch; index += 1; continue; }
      return [code.slice(start, index), index];
    }
    if (ch === ';' && depth === 0 && blockDepth === 0) return [code.slice(start, index), index];
    if (ch === '\n' && depth === 0 && blockDepth === 0) return [code.slice(start, index), index];
    if (/[A-Za-z_]/.test(ch)) {
      const wordStart = index;
      while (index < code.length && /[A-Za-z0-9_]/.test(code[index])) index += 1;
      const word = code.slice(wordStart, index);
      if (depth === 0) {
        if (word === 'function') blockDepth += 1;
        else if (word === 'if') {
          if (['=', ',', '(', '[', '{', 'return', 'and', 'or', 'not', 'elseif', 'then', 'else', '+', '-', '*', '/', '..'].includes(previous)) exprIfDepth += 1;
          else if (blockDepth === 0) return [code.slice(start, wordStart), wordStart];
          else blockDepth += 1;
        } else if (word === 'for' || word === 'while') {
          if (blockDepth === 0) return [code.slice(start, wordStart), wordStart];
          awaitingDo = true;
          blockDepth += 1;
        } else if (word === 'do') {
          if (blockDepth === 0) return [code.slice(start, wordStart), wordStart];
          if (awaitingDo) awaitingDo = false; else blockDepth += 1;
        } else if (word === 'repeat') {
          if (blockDepth === 0) return [code.slice(start, wordStart), wordStart];
          blockDepth += 1;
        } else if (word === 'else') {
          if (exprIfDepth > 0 && blockDepth === 0) exprIfDepth -= 1;
          else if (blockDepth === 0) return [code.slice(start, wordStart), wordStart];
        } else if (word === 'elseif') {
          if (exprIfDepth === 0 && blockDepth === 0) return [code.slice(start, wordStart), wordStart];
        } else if (word === 'end' || word === 'until') {
          if (blockDepth > 0) blockDepth -= 1; else return [code.slice(start, wordStart), wordStart];
        } else if (['local', 'return', 'break', 'continue'].includes(word) && blockDepth === 0) return [code.slice(start, wordStart), wordStart];
      }
      previous = word;
      continue;
    }
    previous = ch;
    index += 1;
  }
  return [code.slice(start), code.length];
}

function splitCommas(text) {
  const parts = [];
  let depth = 0;
  let last = 0;
  let index = 0;
  while (index < text.length) {
    const ch = text[index];
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      index += 1;
      while (index < text.length && text[index] !== quote) {
        if (text[index] === '\\' && index + 1 < text.length) index += 2;
        else if (quote !== '`' && text[index] === '\n') break;
        else index += 1;
      }
      if (index < text.length && text[index] === quote) index += 1;
      continue;
    }
    if (ch === '-' && text[index + 1] === '-') {
      const longEnd = readLongBracket(text, index + 2);
      if (longEnd >= 0) index = longEnd;
      else { const end = text.indexOf('\n', index); index = end < 0 ? text.length : end; }
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(text, index);
      if (longEnd >= 0) { index = longEnd; continue; }
    }
    if ('([{'.includes(ch)) depth += 1;
    else if (')]}'.includes(ch) && depth > 0) depth -= 1;
    else if (ch === ',' && depth === 0) { parts.push(text.slice(last, index)); last = index + 1; }
    index += 1;
  }
  parts.push(text.slice(last));
  return parts;
}

function applyMap(text, resolver) {
  if (!resolver) return text;
  const result = [];
  let index = 0;
  const interpolation = [];
  const braces = [];
  const replacement = word => typeof resolver === 'function' ? resolver(word) : resolver[word];
  while (index < text.length) {
    const ch = text[index];
    if (ch === '"' || ch === "'") {
      const start = index;
      const quote = ch;
      index += 1;
      while (index < text.length && text[index] !== quote) {
        if (text[index] === '\\' && index + 1 < text.length) index += 2; else index += 1;
      }
      if (index < text.length) index += 1;
      result.push(text.slice(start, index));
      continue;
    }
    if (ch === '`') {
      const [kind, stop] = scanBacktick(text, index);
      result.push(text.slice(index, stop));
      index = stop;
      if (kind === 'interp') interpolation.push(0);
      continue;
    }
    if (ch === '-' && text[index + 1] === '-') {
      const longEnd = readLongBracket(text, index + 2);
      if (longEnd >= 0) { result.push(text.slice(index, longEnd)); index = longEnd; }
      else { const end = text.indexOf('\n', index); const stop = end < 0 ? text.length : end; result.push(text.slice(index, stop)); index = stop; }
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(text, index);
      if (longEnd >= 0) { result.push(text.slice(index, longEnd)); index = longEnd; continue; }
    }
    if (ch === '{') {
      if (interpolation.length) interpolation[interpolation.length - 1] += 1;
      braces.push('{');
      result.push(ch);
      index += 1;
      continue;
    }
    if (ch === '}') {
      if (braces.length && braces[braces.length - 1] === '{') braces.pop();
      if (interpolation.length && interpolation[interpolation.length - 1] === 0) {
        interpolation.pop();
        const [kind, stop] = scanBacktick(text, index);
        result.push(text.slice(index, stop));
        index = stop;
        if (kind === 'interp') interpolation.push(0);
        continue;
      }
      if (interpolation.length) interpolation[interpolation.length - 1] -= 1;
      result.push(ch);
      index += 1;
      continue;
    }
    if ('(['.includes(ch)) { braces.push(ch); result.push(ch); index += 1; continue; }
    if (')]' .includes(ch)) { if (braces.length) braces.pop(); result.push(ch); index += 1; continue; }
    if (/[A-Za-z_]/.test(ch)) {
      const start = index;
      index += 1;
      while (index < text.length && /[A-Za-z0-9_]/.test(text[index])) index += 1;
      const word = text.slice(start, index);
      let previous = start - 1;
      while (previous >= 0 && /[ \t\n\r]/.test(text[previous])) previous -= 1;
      const field = previous >= 0 && '.:'.includes(text[previous]) && !(text[previous] === '.' && previous >= 1 && text[previous - 1] === '.');
      let next = index;
      while (next < text.length && /[ \t\n\r]/.test(text[next])) next += 1;
      const tableKey = braces.length && braces[braces.length - 1] === '{' && previous >= 0 && '{,;'.includes(text[previous]) && next < text.length && text[next] === '=' && text[next + 1] !== '=';
      result.push(!field && !tableKey ? (replacement(word) ?? word) : word);
      continue;
    }
    result.push(ch);
    index += 1;
  }
  return result.join('');
}

function getTopLevelSpans(expression) {
  const matchingOpen = new Map();
  const stack = [];
  const top = new Set();
  let index = 0;
  while (index < expression.length) {
    const ch = expression[index];
    if (ch === '"' || ch === "'" || ch === '`') {
      const quote = ch;
      index += 1;
      while (index < expression.length && expression[index] !== quote) {
        if (expression[index] === '\\' && index + 1 < expression.length) index += 2;
        else if (quote !== '`' && expression[index] === '\n') break;
        else index += 1;
      }
      if (index < expression.length) index += 1;
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(expression, index);
      if (longEnd >= 0) { index = longEnd; continue; }
    }
    if ('([{'.includes(ch)) { stack.push([ch, index]); index += 1; continue; }
    if (')]}'.includes(ch)) { if (stack.length) { const [, open] = stack.pop(); matchingOpen.set(index, open); } index += 1; continue; }
    if (!stack.length) top.add(index);
    index += 1;
  }
  return [matchingOpen, top];
}

function splitTopKeyword(expression, word, top) {
  const pattern = new RegExp(`\\b${word}\\b`, 'g');
  let match;
  while ((match = pattern.exec(expression))) if (top.has(match.index)) return [expression.slice(0, match.index).trim(), expression.slice(match.index + match[0].length).trim()];
  return null;
}

function splitTopBinop(expression, top) {
  for (let index = 0; index < expression.length; index += 1) {
    if (!top.has(index)) continue;
    if (expression.startsWith('..', index) && expression[index + 2] !== '.') return [expression.slice(0, index).trim(), expression.slice(index + 2).trim()];
    if ('+*/%^'.includes(expression[index])) return [expression.slice(0, index).trim(), expression.slice(index + 1).trim()];
    if (expression[index] === '-' && index > 0) {
      let previous = index - 1;
      while (previous >= 0 && ' \t\r\n'.includes(expression[previous])) previous -= 1;
      if (previous >= 0 && /[A-Za-z0-9_\)\]\}\"'`]/.test(expression[previous])) return [expression.slice(0, index).trim(), expression.slice(index + 1).trim()];
    }
  }
  return null;
}

function singularizeIndexed(name) {
  if (!name) return name;
  const base = name.replace(/_?\d+$/, '');
  if (Object.prototype.hasOwnProperty.call(singularmap, base)) return singularmap[base];
  if (base.endsWith('List') && base.length > 4) return base.slice(0, -4);
  if (base.endsWith('ies') && base.length > 4) return `${base.slice(0, -3)}y`;
  if (base.endsWith('s') && !base.endsWith('ss') && base.length > 3) return base.slice(0, -1);
  return name;
}

function inferName(expression) {
  let value = stripComments(expression).trim();
  while (value.endsWith(';')) value = value.slice(0, -1).trim();
  if (!value) return null;
  if (/https?:\/\//i.test(value)) {
    const urlHint = inferFromUrl(value);
    if (urlHint) return urlHint;
  }
  let [matchingOpen, top] = getTopLevelSpans(value);
  if (value.startsWith('(') && value.endsWith(')') && matchingOpen.get(value.length - 1) === 0) return inferName(value.slice(1, -1));
  if (/^if\b/.test(value)) {
    const afterIf = value.slice(2);
    const splitThen = splitTopKeyword(afterIf, 'then', getTopLevelSpans(afterIf)[1]);
    if (splitThen) {
      const afterThen = splitThen[1];
      const splitElse = splitTopKeyword(afterThen, 'elseif', getTopLevelSpans(afterThen)[1]) || splitTopKeyword(afterThen, 'else', getTopLevelSpans(afterThen)[1]);
      if (splitElse) return inferName(splitElse[0]) || inferName(splitElse[1]);
    }
  }
  const splitOr = splitTopKeyword(value, 'or', top);
  if (splitOr) {
    const leftTop = getTopLevelSpans(splitOr[0])[1];
    const splitAnd = splitTopKeyword(splitOr[0], 'and', leftTop);
    if (splitAnd) return inferName(splitAnd[1]) || inferName(splitAnd[0]) || inferName(splitOr[1]);
    return inferName(splitOr[0]) || inferName(splitOr[1]);
  }
  const splitAnd = splitTopKeyword(value, 'and', top);
  if (splitAnd) return inferName(splitAnd[1]) || inferName(splitAnd[0]);
  const splitBinary = splitTopBinop(value, top);
  if (splitBinary && splitBinary[0] && splitBinary[1]) return inferName(splitBinary[0]) || inferName(splitBinary[1]);
  if (value.startsWith('#') || (value.startsWith('-') && !/^[-\d]/.test(value.slice(1)))) return inferName(value.slice(1).trim());
  const notMatch = /^not\b\s*(.+)$/s.exec(value);
  if (notMatch) return inferName(notMatch[1]);
  if (/^function\s*\(/.test(value)) return 'Func';
  let match = /^["']([A-Za-z_][A-Za-z0-9_]*)["']\s*$/.exec(value);
  if (match) return safeIdent(normalizeClassName(match[1]));
  let hadArrayIndex = false;
  while (value.endsWith(']')) {
    const open = matchingOpen.get(value.length - 1);
    if (open === undefined || open <= 0) break;
    const inside = value.slice(open + 1, -1).trim();
    if (/^["'][A-Za-z_][A-Za-z0-9_]*["']$/.test(inside)) break;
    value = value.slice(0, open).trim();
    hadArrayIndex = true;
    [matchingOpen, top] = getTopLevelSpans(value);
  }
  const finalize = result => {
    if (!result) return null;
    return safeIdent(hadArrayIndex ? singularizeIndexed(result) : result);
  };
  if (value.endsWith(')')) {
    const open = matchingOpen.get(value.length - 1);
    if (open === 0) return finalize(inferName(value.slice(1, -1)));
    if (open > 0) {
      const callee = value.slice(0, open).trim();
      const args = value.slice(open + 1, -1).trim();
      if (/(?:^|[.:]\s*)GetService$/.test(callee)) {
        const arg = /^["']([^"']+)["']/.exec(args);
        if (arg) return finalize(normalizeClassName(arg[1]));
      }
      if (/^(?:Instance|Drawing)\s*\.\s*new$/.test(callee)) {
        const arg = /^["']([^"']+)["']/.exec(args);
        if (arg) return finalize(normalizeClassName(arg[1]));
      }
      const find = /[.:]\s*(WaitForChild|FindFirstChild|FindFirstChildOfClass|FindFirstChildWhichIsA)$/.exec(callee);
      if (find) {
        const arg = /^["']([^"']+)["']/.exec(args);
        if (arg) {
          let name = normalizeClassName(arg[1]);
          if (keywords.has(name.toLowerCase())) name += 'Child';
          return finalize(name);
        }
      }
      const dataType = /^([A-Z][A-Za-z0-9_]*)\s*\.\s*([A-Za-z_]\w*)$/.exec(callee);
      if (dataType) {
        const name = dataType[2] === 'new' || dataType[2].startsWith('from') || dataType[2].startsWith('look') || ['Angles', 'identity'].includes(dataType[2]) ? dataType[1] : normalizeClassName(dataType[2]);
        return finalize(name);
      }
      const library = /^([a-z_]\w*)\s*\.\s*([a-zA-Z_]\w*)$/.exec(callee);
      if (library) {
        const key = `${library[1]}.${library[2]}`;
        if (libmethods[key]) return finalize(libmethods[key]);
        if (globalfunctions[library[2]]) return finalize(globalfunctions[library[2]]);
        return finalize(normalizeClassName(library[2]));
      }
      const functionCall = /^([A-Za-z_]\w*)$/.exec(callee);
      if (functionCall) return finalize(globalfunctions[functionCall[1]] || functionCall[1]);
      const method = /[.:]\s*([A-Za-z_]\w*)$/.exec(callee);
      if (method) {
        if (method[1] === 'Wait') {
          if (/CharacterAdded\s*:\s*Wait$/.test(callee)) return finalize('Character');
          if (/PlayerAdded\s*:\s*Wait$/.test(callee)) return finalize('Player');
          if (/ChildAdded\s*:\s*Wait$/.test(callee)) return finalize('Child');
        }
        return finalize(methodnames[method[1]] || normalizeClassName(method[1]));
      }
      if (callee.endsWith(')')) return finalize(inferName(callee));
    }
  }
  match = /^Enum\s*\.\s*([A-Za-z_]\w*)\s*\.\s*([A-Za-z_]\w*)\s*$/.exec(value);
  if (match) return finalize(match[2].length <= 1 || keywords.has(match[2].toLowerCase()) ? match[1] + match[2] : match[2]);
  match = /^([A-Z][A-Za-z0-9_]*)\s*\.\s*([A-Za-z_]\w*)\s*$/.exec(value);
  if (match) return finalize(normalizeClassName(match[2]));
  match = /^([a-z_]\w*)\s*\.\s*([a-zA-Z_]\w*)\s*$/.exec(value);
  if (match && libmethods[`${match[1]}.${match[2]}`]) return finalize(libmethods[`${match[1]}.${match[2]}`]);
  match = /\.\s*([A-Za-z_][A-Za-z0-9_]*)\s*$/.exec(value);
  if (match) {
    let name = match[1][0].toLowerCase() === match[1][0] ? match[1][0].toUpperCase() + match[1].slice(1) : match[1];
    if (keywords.has(name.toLowerCase())) name += 'Prop';
    return finalize(name);
  }
  match = /\[\s*["']([A-Za-z_][A-Za-z0-9_]*)["']\s*\]\s*$/.exec(value);
  if (match) {
    let name = match[1][0].toLowerCase() === match[1][0] ? match[1][0].toUpperCase() + match[1].slice(1) : match[1];
    if (keywords.has(name.toLowerCase())) name += 'Field';
    return finalize(name);
  }
  match = /^([A-Za-z_]\w*)\s*$/.exec(value);
  if (match && !keywords.has(match[1].toLowerCase())) {
    const name = match[1][0].toLowerCase() === match[1][0] ? match[1][0].toUpperCase() + match[1].slice(1) : match[1];
    return finalize(name);
  }
  return null;
}

function tokenize(code) {
  const tokens = [];
  let index = 0;
  const interpolation = [];
  while (index < code.length) {
    const ch = code[index];
    if (/\s/.test(ch)) { index += 1; continue; }
    if (ch === '-' && code[index + 1] === '-') {
      const start = index;
      const longEnd = readLongBracket(code, index + 2);
      if (longEnd >= 0) index = longEnd;
      else { const end = code.indexOf('\n', index); index = end < 0 ? code.length : end; }
      tokens.push({ type: 'comment', value: code.slice(start, index), start, end: index });
      continue;
    }
    if (ch === '"' || ch === "'") {
      const start = index;
      const quote = ch;
      index += 1;
      while (index < code.length && code[index] !== quote) {
        if (code[index] === '\\' && index + 1 < code.length) index += 2; else if (code[index] === '\n') break; else index += 1;
      }
      if (index < code.length && code[index] === quote) index += 1;
      tokens.push({ type: 'string', value: code.slice(start, index), start, end: index });
      continue;
    }
    if (ch === '`') {
      const [kind, stop] = scanBacktick(code, index);
      tokens.push({ type: 'string', value: code.slice(index, stop), start: index, end: stop });
      index = stop;
      if (kind === 'interp') interpolation.push(0);
      continue;
    }
    if (ch === '{') {
      if (interpolation.length) interpolation[interpolation.length - 1] += 1;
      tokens.push({ type: 'op', value: ch, start: index, end: index + 1 });
      index += 1;
      continue;
    }
    if (ch === '}') {
      if (interpolation.length && interpolation[interpolation.length - 1] === 0) {
        interpolation.pop();
        const [kind, stop] = scanBacktick(code, index);
        tokens.push({ type: 'string', value: code.slice(index, stop), start: index, end: stop });
        index = stop;
        if (kind === 'interp') interpolation.push(0);
        continue;
      }
      if (interpolation.length) interpolation[interpolation.length - 1] -= 1;
      tokens.push({ type: 'op', value: ch, start: index, end: index + 1 });
      index += 1;
      continue;
    }
    if (ch === '[') {
      const longEnd = readLongBracket(code, index);
      if (longEnd >= 0) { tokens.push({ type: 'string', value: code.slice(index, longEnd), start: index, end: longEnd }); index = longEnd; continue; }
    }
    if (/[A-Za-z_]/.test(ch)) {
      const start = index;
      index += 1;
      while (index < code.length && /[A-Za-z0-9_]/.test(code[index])) index += 1;
      const value = code.slice(start, index);
      tokens.push({ type: keywords.has(value) ? 'kw' : 'ident', value, start, end: index });
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(code[index + 1] || ''))) {
      const start = index;
      index += 1;
      while (index < code.length && /[A-Za-z0-9._]/.test(code[index])) index += 1;
      tokens.push({ type: 'num', value: code.slice(start, index), start, end: index });
      continue;
    }
    tokens.push({ type: 'op', value: ch, start: index, end: index + 1 });
    index += 1;
  }
  return tokens;
}

function prevNonComment(tokens, index) {
  let cursor = index - 1;
  while (cursor >= 0 && tokens[cursor].type === 'comment') cursor -= 1;
  return cursor;
}

function nextNonComment(tokens, index) {
  let cursor = index + 1;
  while (cursor < tokens.length && tokens[cursor].type === 'comment') cursor += 1;
  return cursor;
}

function isDotOrColonAccess(tokens, index) {
  const previous = prevNonComment(tokens, index);
  if (previous < 0) return false;
  const token = tokens[previous];
  if (token.type !== 'op' || !'.:'.includes(token.value)) return false;
  if (token.value === '.') {
    const before = prevNonComment(tokens, previous);
    if (before >= 0 && tokens[before].type === 'op' && tokens[before].value === '.' && tokens[before].end === token.start) return false;
  }
  return true;
}

function findScopes(tokens, code) {
  const scopes = [];
  const stack = [];
  let awaitingDo = false;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type !== 'kw') continue;
    const word = token.value;
    if (word === 'for' || word === 'while') { awaitingDo = true; stack.push(['loop', index, index]); }
    else if (word === 'do') { if (awaitingDo) awaitingDo = false; else stack.push(['do', index, index]); }
    else if (word === 'function') stack.push(['func', index, index]);
    else if (word === 'repeat') stack.push(['repeat', index, index]);
    else if (word === 'if') {
      const previous = prevNonComment(tokens, index);
      let expressionIf = false;
      if (previous >= 0) {
        const previousToken = tokens[previous];
        if (previousToken.type === 'op' && '=,([]{+-*/%^<>~'.includes(previousToken.value)) expressionIf = true;
        else if (previousToken.type === 'kw' && ['return', 'and', 'or', 'not', 'elseif', 'then', 'else', 'while', 'until', 'in'].includes(previousToken.value)) expressionIf = true;
      }
      stack.push([expressionIf ? 'expr_if' : 'if', index, index]);
    } else if (word === 'elseif') {
      if (stack.length && stack[stack.length - 1][0] === 'if') { const item = stack.pop(); scopes.push([item[2], index]); stack.push(['if', item[1], index]); }
    } else if (word === 'else') {
      if (stack.length && stack[stack.length - 1][0] === 'expr_if') stack.pop();
      else if (stack.length && stack[stack.length - 1][0] === 'if') { const item = stack.pop(); scopes.push([item[2], index]); stack.push(['if', item[1], index]); }
    } else if (word === 'end') {
      while (stack.length && stack[stack.length - 1][0] === 'expr_if') stack.pop();
      if (stack.length) { const item = stack.pop(); scopes.push([item[2], index]); }
    } else if (word === 'until') {
      while (stack.length && stack[stack.length - 1][0] === 'expr_if') stack.pop();
      if (stack.length) {
        const item = stack.pop();
        const [, endPosition] = readStatement(code, token.end);
        let endToken = index + 1;
        while (endToken < tokens.length && tokens[endToken].start < endPosition) endToken += 1;
        scopes.push([item[2], endToken]);
      }
    }
  }
  return scopes;
}

function computeTableKeyTokens(tokens) {
  const tableKeys = new Set();
  const brackets = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type === 'op') {
      if ('([{'.includes(token.value)) brackets.push(token.value);
      else if (')]}'.includes(token.value) && brackets.length) brackets.pop();
    } else if (token.type === 'ident' && brackets.length && brackets[brackets.length - 1] === '{') {
      const previous = prevNonComment(tokens, index);
      const next = nextNonComment(tokens, index);
      if (previous >= 0 && next < tokens.length && '{,;'.includes(tokens[previous].value) && tokens[next].type === 'op' && tokens[next].value === '=') {
        const afterEquals = nextNonComment(tokens, next);
        if (afterEquals >= tokens.length || !(tokens[afterEquals].type === 'op' && tokens[afterEquals].value === '=')) tableKeys.add(index);
      }
    }
  }
  return tableKeys;
}

function skipTypeAnnotation(tokens, index) {
  let cursor = nextNonComment(tokens, index);
  let depth = 0;
  let typeHint = null;
  while (cursor < tokens.length) {
    const token = tokens[cursor];
    if (token.type === 'comment') { cursor += 1; continue; }
    if (depth === 0) {
      if (token.type === 'op' && ',=;)'.includes(token.value)) break;
      if (token.type === 'kw' && !['nil', 'true', 'false', 'function'].includes(token.value)) break;
    }
    if (token.type === 'op') {
      if ('([{<'.includes(token.value)) depth += 1;
      else if (')]}>' .includes(token.value)) { if (depth > 0) depth -= 1; else break; }
    } else if (token.type === 'ident' && depth === 0 && !typeHint && !['any', 'unknown', 'never', 'nil'].includes(token.value.toLowerCase())) typeHint = normalizeClassName(token.value);
    cursor += 1;
  }
  return [typeHint, cursor];
}

function collectAssignments(tokens, code, tableKeys) {
  const assignments = new Map();
  let index = 0;
  while (index < tokens.length - 1) {
    const token = tokens[index];
    if (token.type === 'kw' && token.value === 'local') {
      let cursor = nextNonComment(tokens, index);
      while (cursor < tokens.length) {
        if (tokens[cursor].type !== 'ident') break;
        cursor = nextNonComment(tokens, cursor);
        if (cursor < tokens.length && tokens[cursor].type === 'op' && tokens[cursor].value === ':') [, cursor] = skipTypeAnnotation(tokens, cursor);
        if (cursor < tokens.length && tokens[cursor].type === 'op' && tokens[cursor].value === ',') { cursor = nextNonComment(tokens, cursor); continue; }
        break;
      }
      index = cursor + 1;
      continue;
    }
    if (token.type !== 'ident' || tableKeys.has(index) || isDotOrColonAccess(tokens, index)) { index += 1; continue; }
    const next = nextNonComment(tokens, index);
    if (next >= tokens.length || tokens[next].type !== 'op' || tokens[next].value !== '=') { index += 1; continue; }
    const nextNext = nextNonComment(tokens, next);
    if (nextNext < tokens.length && tokens[nextNext].type === 'op' && tokens[nextNext].value === '=') { index = nextNext + 1; continue; }
    const previous = prevNonComment(tokens, index);
    if (previous >= 0) {
      const previousToken = tokens[previous];
      if (previousToken.type === 'kw' && ['for', 'local'].includes(previousToken.value)) { index += 1; continue; }
      if (previousToken.type === 'op' && '~<>'.includes(previousToken.value)) { index += 1; continue; }
    }
    const [text] = readStatement(code, tokens[next].end);
    if (!assignments.has(token.value)) assignments.set(token.value, []);
    assignments.get(token.value).push([index, text]);
    index = next + 1;
  }
  return assignments;
}

function inferMultiReturn(rhs, index) {
  const value = stripComments(rhs).trim();
  if (/^(?:pcall|xpcall)\s*\(/.test(value)) {
    if (index === 1) {
      const returned = /\breturn\s+(.+?)\s+end\s*[,)]/s.exec(value);
      if (returned) { const candidate = inferName(returned[1]); if (candidate) return candidate; }
      return 'Result';
    }
    return `Result${index}`;
  }
  if (/:\s*GetBoundingBox\s*\(\s*\)$/.test(value) && index === 1) return 'Size';
  if (/^string\s*\.\s*find\s*\(/.test(value)) {
    if (index === 1) return 'EndIndex';
    if (index >= 2) return 'Capture';
  }
  if (/^Color3\s*\.\s*toHSV\s*\(/.test(value)) {
    if (index === 1) return 'Saturation';
    if (index === 2) return 'Value';
  }
  return inferName(value);
}

function inferParamFromUsage(tokens, paramName, bodyStart, bodyEnd) {
  const playerMembers = new Set('Character UserId DisplayName AccountAge Team TeamColor PlayerGui Backpack PlayerScripts StarterGear GetMouse Kick GetRankInGroup GetRoleInGroup IsInGroup IsFriendsWith LoadCharacter'.split(/\s+/));
  const humanoidMembers = new Set('Health MaxHealth WalkSpeed JumpPower JumpHeight HipHeight TakeDamage ChangeState GetState LoadAnimation EquipTool UnequipTools'.split(/\s+/));
  const inputMembers = new Set('KeyCode UserInputType UserInputState Delta'.split(/\s+/));
  const partMembers = new Set('CFrame Anchored CanCollide Transparency BrickColor Material AssemblyLinearVelocity AssemblyAngularVelocity ApplyImpulse'.split(/\s+/));
  const instanceMembers = new Set('Parent ClassName GetChildren GetDescendants FindFirstChild WaitForChild Destroy Clone GetAttribute SetAttribute'.split(/\s+/));
  for (let index = bodyStart; index < Math.min(bodyEnd, tokens.length); index += 1) {
    const token = tokens[index];
    if (token.type !== 'ident' || token.value !== paramName || isDotOrColonAccess(tokens, index)) continue;
    const next = nextNonComment(tokens, index);
    if (next >= tokens.length || tokens[next].type !== 'op' || !'.:'.includes(tokens[next].value)) {
      if (next < tokens.length && tokens[next].type === 'op' && tokens[next].value === '(') return 'Callback';
      if (next < tokens.length && tokens[next].type === 'op' && '+-*/%^'.includes(tokens[next].value)) return 'Num';
      continue;
    }
    const memberIndex = nextNonComment(tokens, next);
    if (memberIndex >= tokens.length || tokens[memberIndex].type !== 'ident') continue;
    const member = tokens[memberIndex].value;
    if (member === 'WaitForChild' || member === 'FindFirstChild') {
      const open = nextNonComment(tokens, memberIndex);
      if (open < tokens.length && tokens[open].type === 'op' && tokens[open].value === '(') {
        const arg = nextNonComment(tokens, open);
        if (arg < tokens.length && tokens[arg].type === 'string') {
          const value = tokens[arg].value.replace(/^["'`]|["'`]$/g, '');
          if (['Humanoid', 'HumanoidRootPart', 'Head', 'Torso', 'UpperTorso'].includes(value)) return 'Character';
          if (['PlayerGui', 'Backpack', 'PlayerScripts', 'StarterGear'].includes(value)) return 'Player';
        }
      }
    }
    if (member === 'IsA') {
      const open = nextNonComment(tokens, memberIndex);
      if (open < tokens.length && tokens[open].type === 'op' && tokens[open].value === '(') {
        const arg = nextNonComment(tokens, open);
        if (arg < tokens.length && tokens[arg].type === 'string') {
          const name = safeIdent(normalizeClassName(tokens[arg].value.replace(/^["'`]|["'`]$/g, '')));
          if (name) return name;
        }
      }
    }
    if (playerMembers.has(member)) return 'Player';
    if (humanoidMembers.has(member)) return 'Humanoid';
    if (inputMembers.has(member)) return 'Input';
    if (partMembers.has(member)) return 'Part';
    if (instanceMembers.has(member)) return 'Inst';
  }
  return 'Arg';
}

function renameCode(code) {
  const tokens = tokenize(code);
  const count = tokens.length;
  if (!count) return code;
  const scopes = findScopes(tokens, code).sort((left, right) => left[0] - right[0]);
  const scopeEndFor = tokenIndex => {
    let position = scopes.findIndex(scope => scope[0] > tokenIndex);
    if (position < 0) position = scopes.length;
    for (let index = position - 1; index >= 0; index -= 1) if (scopes[index][1] > tokenIndex) return scopes[index][1];
    return count;
  };
  const scopeChain = tokenIndex => scopes.map((scope, index) => ({ scope, index })).filter(item => item.scope[0] <= tokenIndex && tokenIndex < item.scope[1]).sort((left, right) => left.scope[0] - right.scope[0]).map(item => item.index);
  const tableKeys = computeTableKeyTokens(tokens);
  const assignments = collectAssignments(tokens, code, tableKeys);
  const declared = [];
  for (let index = 0; index < count; index += 1) {
    if (tokens[index].type !== 'kw' || tokens[index].value !== 'local') continue;
    let cursor = nextNonComment(tokens, index);
    if (cursor < count && tokens[cursor].type === 'kw' && tokens[cursor].value === 'function') {
      const fn = nextNonComment(tokens, cursor);
      if (fn < count && tokens[fn].type === 'ident' && !isPlaceholder(tokens[fn].value)) declared.push([tokens[fn].value, fn, scopeEndFor(index)]);
    } else {
      while (cursor < count) {
        if (tokens[cursor].type !== 'ident') break;
        if (!isPlaceholder(tokens[cursor].value)) declared.push([tokens[cursor].value, cursor, scopeEndFor(index)]);
        cursor = nextNonComment(tokens, cursor);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ':') [, cursor] = skipTypeAnnotation(tokens, cursor);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ',') { cursor = nextNonComment(tokens, cursor); continue; }
        break;
      }
    }
  }
  const scopeUsed = new Map();
  const renames = [];
  const byOld = new Map();
  const addRename = (oldName, newName, declaration, active, end) => {
    const rule = { oldName, newName, declaration, active, end };
    renames.push(rule);
    if (!byOld.has(oldName)) byOld.set(oldName, []);
    byOld.get(oldName).push(rule);
  };
  const resolverAt = tokenIndex => word => {
    const rules = byOld.get(word) || [];
    for (let index = rules.length - 1; index >= 0; index -= 1) {
      const rule = rules[index];
      if (rule.active <= tokenIndex && tokenIndex < rule.end) return rule.newName;
    }
    return null;
  };
  const pickCandidate = (newName, oldName, nameIndex, scopeEnd, shadow) => {
    const chain = scopeChain(nameIndex);
    const seen = new Set(scopeUsed.get(-1) || []);
    for (const scope of chain) for (const name of scopeUsed.get(scope) || []) seen.add(name);
    for (const [declName, declaration, end] of declared) if (declaration !== nameIndex && declName !== oldName && !(end <= nameIndex || declaration >= scopeEnd)) seen.add(declName);
    let candidate = shadow || keywords.has(newName.toLowerCase()) ? joinSuffix(newName, 2) : newName;
    let suffix = 3;
    while (seen.has(candidate) || keywords.has(candidate.toLowerCase()) || (candidate === oldName && shadow)) { candidate = joinSuffix(newName, suffix); suffix += 1; }
    const innermost = chain.length ? chain[chain.length - 1] : -1;
    if (!scopeUsed.has(innermost)) scopeUsed.set(innermost, new Set());
    scopeUsed.get(innermost).add(candidate);
    return candidate;
  };
  let index = 0;
  while (index < count) {
    const token = tokens[index];
    if (token.type === 'kw' && token.value === 'local') {
      let cursor = nextNonComment(tokens, index);
      if (cursor < count && tokens[cursor].type === 'kw' && tokens[cursor].value === 'function') {
        const functionToken = nextNonComment(tokens, cursor);
        if (functionToken < count && tokens[functionToken].type === 'ident') {
          const oldName = tokens[functionToken].value;
          const end = scopeEndFor(index);
          if (isPlaceholder(oldName)) addRename(oldName, pickCandidate('func', oldName, functionToken, end, false), functionToken, functionToken, end);
          else {
            const chain = scopeChain(functionToken);
            const inner = chain.length ? chain[chain.length - 1] : -1;
            if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set());
            scopeUsed.get(inner).add(oldName);
            addRename(oldName, oldName, functionToken, functionToken, end);
          }
        }
        index = cursor;
        continue;
      }
      const names = [];
      while (cursor < count) {
        if (tokens[cursor].type !== 'ident') break;
        const nameIndex = cursor;
        const oldName = tokens[cursor].value;
        let typeHint = null;
        cursor = nextNonComment(tokens, cursor);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ':') [typeHint, cursor] = skipTypeAnnotation(tokens, cursor);
        names.push([nameIndex, oldName, typeHint]);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ',') { cursor = nextNonComment(tokens, cursor); continue; }
        break;
      }
      if (!names.length) { index += 1; continue; }
      const hasEquals = cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === '=';
      let afterRhs = cursor;
      let rhsParts = [];
      if (hasEquals) {
        const [rhsText, rhsEnd] = readStatement(code, tokens[cursor].end);
        rhsParts = splitCommas(rhsText);
        let firstFunction = count;
        let scan = cursor + 1;
        while (scan < count && tokens[scan].start < rhsEnd) {
          if (tokens[scan].type === 'kw' && tokens[scan].value === 'function') { firstFunction = scan; break; }
          scan += 1;
        }
        afterRhs = Math.min(scan, firstFunction);
      }
      const scopeEnd = scopeEndFor(index);
      for (let nameIndex = 0; nameIndex < names.length; nameIndex += 1) {
        const [declaration, oldName, typeHint] = names[nameIndex];
        if (oldName === '_' || (oldName.startsWith('_') && !isPlaceholder(oldName))) continue;
        let rawName = null;
        let swappedRhs = null;
        if (hasEquals) {
          const resolver = resolverAt(declaration);
          if (nameIndex < rhsParts.length) { swappedRhs = applyMap(rhsParts[nameIndex], resolver); rawName = inferName(swappedRhs); }
          else if (rhsParts.length === 1) { swappedRhs = applyMap(rhsParts[0], resolver); rawName = inferMultiReturn(swappedRhs, nameIndex); }
        }
        if (!rawName && typeHint) rawName = safeIdent(typeHint);
        if (!rawName) {
          for (const [assignmentIndex, assignmentText] of assignments.get(oldName) || []) {
            if (declaration < assignmentIndex && assignmentIndex < scopeEnd) {
              const swapped = applyMap(assignmentText, resolverAt(assignmentIndex));
              const candidate = inferName(swapped);
              if (candidate) { rawName = candidate; swappedRhs = swapped; break; }
            }
          }
        }
        if (!rawName && swappedRhs !== null && /^\{.*\}$/s.test(stripComments(swappedRhs).trim()) && isPlaceholder(oldName)) rawName = 'Tbl';
        if (!rawName) {
          const chain = scopeChain(declaration);
          const inner = chain.length ? chain[chain.length - 1] : -1;
          if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set());
          scopeUsed.get(inner).add(oldName);
          addRename(oldName, oldName, declaration, afterRhs, scopeEnd);
          continue;
        }
        const newName = camel(rawName);
        const rhsClean = swappedRhs ? stripComments(swappedRhs).trim() : '';
        const reassigned = (assignments.get(oldName) || []).some(([assignmentIndex, assignmentText]) => declaration < assignmentIndex && assignmentIndex < scopeEnd && stripComments(assignmentText).trim() !== newName);
        const shadow = Boolean(swappedRhs && startsWithName(swappedRhs, newName) && (rhsClean !== newName || reassigned));
        const chain = scopeChain(declaration);
        const seen = new Set(scopeUsed.get(-1) || []);
        for (const scope of chain) for (const used of scopeUsed.get(scope) || []) seen.add(used);
        if (newName === oldName && !shadow && !seen.has(newName) && !keywords.has(newName.toLowerCase())) {
          const inner = chain.length ? chain[chain.length - 1] : -1;
          if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set());
          scopeUsed.get(inner).add(oldName);
          addRename(oldName, oldName, declaration, afterRhs, scopeEnd);
          continue;
        }
        addRename(oldName, pickCandidate(newName, oldName, declaration, scopeEnd, shadow), declaration, afterRhs, scopeEnd);
      }
      index += 1;
      continue;
    }
    if (token.type === 'kw' && token.value === 'function') {
      const functionEnd = scopeEndFor(index);
      let open = nextNonComment(tokens, index);
      while (open < count && !(tokens[open].type === 'op' && tokens[open].value === '(')) open = nextNonComment(tokens, open);
      if (open < count) {
        let hints = null;
        const p1 = prevNonComment(tokens, index);
        if (p1 >= 0 && tokens[p1].type === 'op' && tokens[p1].value === '(') {
          const p2 = prevNonComment(tokens, p1);
          if (p2 >= 0 && tokens[p2].type === 'ident' && ['Connect', 'Once', 'ConnectParallel'].includes(tokens[p2].value)) {
            const p3 = prevNonComment(tokens, p2);
            if (p3 >= 0 && tokens[p3].type === 'op' && '.:'.includes(tokens[p3].value)) {
              const p4 = prevNonComment(tokens, p3);
              if (p4 >= 0 && tokens[p4].type === 'ident') {
                const signalName = resolverAt(p4)(tokens[p4].value) || tokens[p4].value;
                const baseSignal = signalName.replace(/_?\d+$/, '').toLowerCase();
                hints = signalparams[baseSignal] || signalparams[tokens[p4].value.toLowerCase()] || null;
              }
            }
          }
        }
        const params = [];
        let cursor = nextNonComment(tokens, open);
        while (cursor < count) {
          if (tokens[cursor].type === 'op' && tokens[cursor].value === ')') { cursor += 1; break; }
          if (tokens[cursor].type === 'op' && tokens[cursor].value === '.') { cursor = nextNonComment(tokens, cursor); continue; }
          if (tokens[cursor].type === 'ident') {
            const parameter = cursor;
            const name = tokens[cursor].value;
            let typeHint = null;
            cursor = nextNonComment(tokens, cursor);
            if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ':') [typeHint, cursor] = skipTypeAnnotation(tokens, cursor);
            params.push([parameter, name, typeHint]);
            if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ',') cursor = nextNonComment(tokens, cursor); else continue;
          } else cursor += 1;
        }
        for (let parameterIndex = 0; parameterIndex < params.length; parameterIndex += 1) {
          const [parameter, name, typeHint] = params[parameterIndex];
          if (name === '_') continue;
          if (isPlaceholder(name)) {
            let raw = hints && parameterIndex < hints.length ? hints[parameterIndex] : null;
            if (!raw && typeHint) raw = safeIdent(typeHint);
            if (!raw) raw = inferParamFromUsage(tokens, name, cursor, functionEnd);
            addRename(name, pickCandidate(camel(raw), name, parameter, functionEnd, false), parameter, parameter, functionEnd);
          } else {
            const chain = scopeChain(parameter);
            const inner = chain.length ? chain[chain.length - 1] : -1;
            if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set());
            scopeUsed.get(inner).add(name);
            addRename(name, name, parameter, parameter, functionEnd);
          }
        }
      }
      index += 1;
      continue;
    }
    if (token.type === 'kw' && token.value === 'for') {
      const loopEnd = scopeEndFor(index);
      const variables = [];
      let cursor = nextNonComment(tokens, index);
      while (cursor < count) {
        if (tokens[cursor].type !== 'ident') break;
        const declaration = cursor;
        const name = tokens[cursor].value;
        let typeHint = null;
        cursor = nextNonComment(tokens, cursor);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ':') [typeHint, cursor] = skipTypeAnnotation(tokens, cursor);
        variables.push([declaration, name, typeHint]);
        if (cursor < count && tokens[cursor].type === 'op' && tokens[cursor].value === ',') { cursor = nextNonComment(tokens, cursor); continue; }
        break;
      }
      if (variables.length && cursor < count) {
        const separator = tokens[cursor];
        let doIndex = cursor + 1;
        let depth = 0;
        while (doIndex < count) {
          const current = tokens[doIndex];
          if (current.type === 'op') { if ('([{'.includes(current.value)) depth += 1; else if (')]}'.includes(current.value) && depth > 0) depth -= 1; }
          else if (current.type === 'kw' && current.value === 'do' && depth === 0) break;
          doIndex += 1;
        }
        if (separator.type === 'op' && separator.value === '=') {
          const [declaration, name] = variables[0];
          if (isPlaceholder(name)) addRename(name, pickCandidate('index', name, declaration, loopEnd, false), declaration, doIndex, loopEnd);
          else {
            const chain = scopeChain(declaration); const inner = chain.length ? chain[chain.length - 1] : -1;
            if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set()); scopeUsed.get(inner).add(name); addRename(name, name, declaration, doIndex, loopEnd);
          }
        } else if (separator.type === 'kw' && separator.value === 'in') {
          const iteratorStart = separator.end;
          const iteratorEnd = doIndex < count ? tokens[doIndex].start : code.length;
          const iteratorRaw = code.slice(iteratorStart, iteratorEnd).trim();
          const iterator = applyMap(iteratorRaw, resolverAt(cursor));
          const ipairs = /^ipairs\s*\(/.test(iterator);
          let collection = iterator;
          const iteratorMatch = /^(?:ipairs|pairs)\s*\((.+)\)$/s.exec(iterator);
          if (iteratorMatch) collection = iteratorMatch[1].trim();
          else { const nextMatch = /^next\s*,\s*(.+)$/s.exec(iterator); if (nextMatch) collection = nextMatch[1].trim(); }
          const inferred = inferName(collection);
          let valueName = inferred ? singularizeIndexed(inferred) : 'Value';
          if (valueName === inferred && inferred) {
            const tagged = /GetTagged\s*\(\s*["']([^"']+)["']/.exec(collection);
            if (tagged) valueName = normalizeClassName(tagged[1]);
            else if (!Object.values(singularmap).includes(valueName)) valueName = 'Value';
          }
          for (let variableIndex = 0; variableIndex < variables.length; variableIndex += 1) {
            const [declaration, name, typeHint] = variables[variableIndex];
            if (name === '_') continue;
            if (isPlaceholder(name)) {
              const raw = typeHint && safeIdent(typeHint) ? safeIdent(typeHint) : variableIndex === 0 ? (ipairs ? 'Index' : 'Key') : variableIndex === 1 ? valueName : `Value${variableIndex}`;
              addRename(name, pickCandidate(camel(raw), name, declaration, loopEnd, false), declaration, doIndex, loopEnd);
            } else {
              const chain = scopeChain(declaration); const inner = chain.length ? chain[chain.length - 1] : -1;
              if (!scopeUsed.has(inner)) scopeUsed.set(inner, new Set()); scopeUsed.get(inner).add(name); addRename(name, name, declaration, doIndex, loopEnd);
            }
          }
        }
      }
      index += 1;
      continue;
    }
    index += 1;
  }
  const covered = new Map();
  for (const rule of renames) { if (!covered.has(rule.oldName)) covered.set(rule.oldName, []); covered.get(rule.oldName).push([rule.declaration, rule.end]); }
  for (const [oldName, list] of assignments) {
    if (!isPlaceholder(oldName)) continue;
    for (const [assignmentIndex, assignmentText] of list) {
      if ((covered.get(oldName) || []).some(([start, end]) => start <= assignmentIndex && assignmentIndex < end)) continue;
      const raw = inferName(applyMap(assignmentText, resolverAt(assignmentIndex)));
      if (raw) { addRename(oldName, pickCandidate(camel(raw), oldName, assignmentIndex, count, false), assignmentIndex, assignmentIndex, count); if (!covered.has(oldName)) covered.set(oldName, []); covered.get(oldName).push([0, count]); break; }
    }
  }
  if (!renames.length) return code;
  const operations = [];
  for (let tokenIndex = 0; tokenIndex < count; tokenIndex += 1) {
    const token = tokens[tokenIndex];
    if (token.type !== 'ident' || tableKeys.has(tokenIndex) || isDotOrColonAccess(tokens, tokenIndex)) continue;
    let best = null;
    for (const rule of byOld.get(token.value) || []) if ((tokenIndex === rule.declaration || (rule.active <= tokenIndex && tokenIndex < rule.end)) && (!best || rule.declaration > best.declaration)) best = rule;
    if (best && best.newName !== token.value) operations.push([token.start, token.end, best.newName]);
  }
  if (!operations.length) return code;
  operations.sort((left, right) => left[0] - right[0]);
  const output = [];
  let last = 0;
  for (const [start, end, value] of operations) { if (start < last) continue; output.push(code.slice(last, start), value); last = end; }
  output.push(code.slice(last));
  return output.join('');
}

module.exports = { renameCode, tokenize, inferName };
