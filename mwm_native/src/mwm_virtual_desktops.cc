#include "mwm_virtual_desktops.h"

// TODO: Implement node error handling
namespace mwm_vd {

HWND g_hwnd = NULL;

void GetCurrentVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    // BOOL onCurrentDesktop;

    IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

    IVirtualDesktopManagerInternal *pDesktopManagerInternal = nullptr;
	InitializeVirtualDesktopManagerInternal(&pDesktopManagerInternal);

    IVirtualDesktop *pDesktop;
    if(FAILED(pDesktopManagerInternal->GetCurrentDesktop(&pDesktop))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

    GUID desktopId = { 0 };
    if(FAILED(pDesktop->GetID(&desktopId))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }




    IObjectArray *pDesktops;
	if (pDesktopManager == nullptr || FAILED(pDesktopManagerInternal->GetDesktops(&pDesktops))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    UINT numDesktops;
    if (FAILED(pDesktops->GetCount(&numDesktops))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

    UINT desktopNumber = -1;
    IVirtualDesktop *pDesktopTmp;
    int i;
    for(i = 0; i < numDesktops; i++){
    	if(FAILED(pDesktops->GetAt(i, __uuidof(IVirtualDesktop), (void**)&pDesktopTmp))) {
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guid;
        if(FAILED(pDesktopTmp->GetID(&guid))){
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guidToFind = desktopId;
        if(guid == guidToFind){
            desktopNumber = i;
        }
    }

    args.GetReturnValue().Set(v8::Number::New(isolate, desktopNumber));


    // args.GetReturnValue().Set(v8::Boolean::New(isolate, onCurrentDesktop));
}


void IsMainWindowOnCurrentVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    BOOL onCurrentDesktop;

    IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

    if(FAILED(pDesktopManager->IsWindowOnCurrentVirtualDesktop(g_hwnd, &onCurrentDesktop))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

    args.GetReturnValue().Set(v8::Boolean::New(isolate, onCurrentDesktop));
}

void GetMainWindowVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    GUID desktopId = { 0 };

    IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

    IVirtualDesktopManagerInternal *pDesktopManagerInternal = nullptr;
	InitializeVirtualDesktopManagerInternal(&pDesktopManagerInternal);

    HWND hwnd = g_hwnd;
    if (FAILED(pDesktopManager->GetWindowDesktopId(hwnd, &desktopId))) {
		MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    IObjectArray *pDesktops;
	if (pDesktopManager == nullptr || FAILED(pDesktopManagerInternal->GetDesktops(&pDesktops))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    UINT numDesktops;
    if (FAILED(pDesktops->GetCount(&numDesktops))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

    UINT desktopNumber = -1;
    IVirtualDesktop *pDesktop;
    int i;
    for(i = 0; i < numDesktops; i++){
    	if(FAILED(pDesktops->GetAt(i, __uuidof(IVirtualDesktop), (void**)&pDesktop))) {
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guid;
        if(FAILED(pDesktop->GetID(&guid))){
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guidToFind = desktopId;
        if(guid == guidToFind){
            desktopNumber = i;
        }
    }

    args.GetReturnValue().Set(v8::Number::New(isolate, desktopNumber));
}

void GetWindowVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int hwndInt = (int)(args[0]->NumberValue());
    HWND hwnd = (HWND)hwndInt;

    GUID desktopId = { 0 };

    IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

    IVirtualDesktopManagerInternal *pDesktopManagerInternal = nullptr;
	InitializeVirtualDesktopManagerInternal(&pDesktopManagerInternal);

    // HWND hwnd = g_hwnd;
    if (FAILED(pDesktopManager->GetWindowDesktopId(hwnd, &desktopId))) {
		MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    IObjectArray *pDesktops;
	if (pDesktopManager == nullptr || FAILED(pDesktopManagerInternal->GetDesktops(&pDesktops))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    UINT numDesktops;
    if (FAILED(pDesktops->GetCount(&numDesktops))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

    UINT desktopNumber = -1;
    IVirtualDesktop *pDesktop;
    int i;
    for(i = 0; i < numDesktops; i++){
    	if(FAILED(pDesktops->GetAt(i, __uuidof(IVirtualDesktop), (void**)&pDesktop))) {
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guid;
        if(FAILED(pDesktop->GetID(&guid))){
            MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    		return;
        }
        GUID guidToFind = desktopId;
        if(guid == guidToFind){
            desktopNumber = i;
        }
    }

    args.GetReturnValue().Set(v8::Number::New(isolate, desktopNumber));
}


void GuidToString(const GUID &guid, char *s){
    std::wstring guidStr(40, L'\0');
    ::StringFromGUID2(guid, const_cast<LPOLESTR>(guidStr.c_str()), guidStr.length());

    sprintf(s, "%ls", guidStr.c_str());
}

void GetMainWindowVirtualDesktopId(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    GUID desktopId = { 0 };

    IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

    HWND hwnd = g_hwnd;
    if(FAILED(pDesktopManager->GetWindowDesktopId(hwnd, &desktopId))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
        return;
    }

    char tmpStr[256];
    GuidToString(desktopId, tmpStr);
    args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, tmpStr));
}

void GetVirtualDesktopCount(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    UINT num = -1;

	IVirtualDesktopManagerInternal *pDesktopManager = nullptr;
	InitializeVirtualDesktopManagerInternal(&pDesktopManager);

    IObjectArray *pDesktops;
    if (pDesktopManager == nullptr || FAILED(pDesktopManager->GetDesktops(&pDesktops))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }

	if (FAILED(pDesktopManager->GetCount(&num))) {
		MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
	}

    args.GetReturnValue().Set(v8::Number::New(isolate, num));
}

void SwitchVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args){
  v8::Isolate* isolate = args.GetIsolate();

  int num = args[0]->NumberValue();

	IVirtualDesktopManagerInternal *pDesktopManager = nullptr;
	InitializeVirtualDesktopManagerInternal(&pDesktopManager);

    IObjectArray *pDesktops;
    if (pDesktopManager == nullptr || FAILED(pDesktopManager->GetDesktops(&pDesktops))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
        return;
    }

    IVirtualDesktop *pDesktop;
    if (FAILED(pDesktops->GetAt(num, __uuidof(IVirtualDesktop), (void**)&pDesktop))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		return;
    }
    if (FAILED(pDesktopManager->SwitchDesktop(pDesktop))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    }

    // args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, ""));
}

void SwitchWindowToVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args){
  v8::Isolate* isolate = args.GetIsolate();

  int hwndInt = (int)(args[0]->NumberValue());
  int num = (int)(args[1]->NumberValue());

  HWND hwnd = (HWND)hwndInt;

	IVirtualDesktopManager *pDesktopManager = nullptr;
	InitializeVirtualDesktopManager(&pDesktopManager);

  GUID desktopId = { 0 };
  UINT numDesktops;
  if (FAILED(pDesktops->GetCount(&numDesktops))){
      MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
      return;
  }

  UINT desktopNumber = -1;
  IVirtualDesktop *pDesktop;
  int i;
  for(i = 0; i < numDesktops; i++){
    if(i == num){
      if(FAILED(pDesktops->GetAt(i, __uuidof(IVirtualDesktop), (void**)&pDesktop))) {
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
        return;
      }
      // GUID guid;
      if(FAILED(pDesktop->GetID(&desktopId))){
        MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
        return;
      }
    }
  }

  if (FAILED(pDesktopManager->MoveWindowToDesktop(hwnd, &desktopId))) {
    MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    return;
  }

    // IObjectArray *pDesktops;
    // if (pDesktopManager == nullptr || FAILED(pDesktopManager->GetDesktops(&pDesktops))) {
    //     MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    //     return;
    // }
    //
    // IVirtualDesktop *pDesktop;
    // if (FAILED(pDesktops->GetAt(num, __uuidof(IVirtualDesktop), (void**)&pDesktop))) {
    //     MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
		// return;
    // }
    // if (FAILED(pDesktopManager->SwitchDesktop(pDesktop))) {
    //     MessageBoxEx(NULL, TEXT("Some error occured. It is possible that the internal API has changed."), TEXT("ERROR"), MB_OK | MB_ICONERROR, 0);
    // }

    // args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, ""));
}

HRESULT InitializeVirtualDesktopManager(IVirtualDesktopManager **ppDesktopManager) {
    ::CoInitialize(NULL);

    IServiceProvider* pServiceProvider = nullptr;
    if(FAILED(::CoCreateInstance(CLSID_ImmersiveShell, NULL, CLSCTX_LOCAL_SERVER, __uuidof(IServiceProvider), (PVOID*)&pServiceProvider))){
        return E_FAIL;
    }
    if(FAILED(pServiceProvider->QueryService(__uuidof(IVirtualDesktopManager), ppDesktopManager))){
        return E_FAIL;
    }

    return S_OK;
}

HRESULT InitializeVirtualDesktopManagerInternal(IVirtualDesktopManagerInternal **ppDesktopManager) {
	::CoInitializeEx(NULL, COINIT_APARTMENTTHREADED | COINIT_DISABLE_OLE1DDE);

	IServiceProvider* pServiceProvider = nullptr;
	if (FAILED(::CoCreateInstance(CLSID_ImmersiveShell, NULL, CLSCTX_LOCAL_SERVER, __uuidof(IServiceProvider), (PVOID*)&pServiceProvider))) {
		return E_FAIL;
	}
	if (FAILED(pServiceProvider->QueryService(CLSID_VirtualDesktopAPI_Unknown, ppDesktopManager))) {
		return E_FAIL;
	}

	return S_OK;
}

void init_virtual_desktops(v8::Local<v8::Object> exports) {
    // Store my handle when I create the process for access later
    g_hwnd = GetForegroundWindow();

    NODE_SET_METHOD(exports, "switchVirtualDesktop", SwitchVirtualDesktop);
    NODE_SET_METHOD(exports, "getVirtualDesktopCount", GetVirtualDesktopCount);
    NODE_SET_METHOD(exports, "getMainWindowVirtualDesktopId", GetMainWindowVirtualDesktopId);
    NODE_SET_METHOD(exports, "getMainWindowVirtualDesktopNumber", GetMainWindowVirtualDesktopNumber);
    NODE_SET_METHOD(exports, "isMainWindowOnCurrentVirtualDesktop", IsMainWindowOnCurrentVirtualDesktop);
    NODE_SET_METHOD(exports, "switchWindowToVirtualDesktop", SwitchWindowToVirtualDesktop);
}

}
