// mwm.cc
#include <node.h>
#include <vector>
#include <string>
#include <windows.h>
#include <tchar.h>
#include <Dwmapi.h>

#include "mwm_virtual_desktops.h"

namespace mwm {

//==============================================================================
// Taskbar
//==============================================================================
void mwm_DisableTaskBar(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND TaskBar = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(TaskBar != NULL){
        EnableWindow(TaskBar, FALSE);
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Disabled"));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Not Disabled"));
    }
}

void mwm_EnableTaskBar(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND TaskBar = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(TaskBar != NULL){
        EnableWindow(TaskBar, TRUE);
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Enabled"));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Not Enabled"));
    }
}

void mwm_HideTaskBar(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND TaskBar = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(TaskBar != NULL){
        ShowWindow(TaskBar, SW_HIDE);
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Disabled"));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Not Disabled"));
    }
}

void mwm_ShowTaskBar(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND TaskBar = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(TaskBar != NULL){
        ShowWindow(TaskBar, SW_SHOW);
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Disabled"));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Not Disabled"));
    }
}

void mwm_IsTaskBarVisible(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(hTaskbarWnd != NULL){
        bool isVisible = IsWindowVisible(hTaskbarWnd);
        args.GetReturnValue().Set(v8::Boolean::New(isolate, isVisible));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_ShowTaskBar]::Error: Can't find Shell_TrayWnd"));
    }
}

//==============================================================================
// Window Handling
//==============================================================================
void mwm_GetTaskBarHwnd(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    if(hTaskbarWnd != NULL){
        // bool isVisible = IsWindowVisible(hTaskbarWnd);
        int hwndInt = *((int*)&hTaskbarWnd);
        args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_ShowTaskBar]::Error: Can't find Shell_TrayWnd"));
    }
}
void mwm_GetDesktopWindowHwnd(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    // HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    HWND hwnd = GetDesktopWindow();
    if(hwnd != NULL){
        // bool isVisible = IsWindowVisible(hTaskbarWnd);
        int hwndInt = *((int*)&hwnd);
        args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_GetDesktopWindowHwnd]::Error: Can't find desktop window"));
    }
}
void mwm_GetShellWindowHwnd(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    // HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    HWND hwnd = GetShellWindow();
    if(hwnd != NULL){
        // bool isVisible = IsWindowVisible(hTaskbarWnd);
        int hwndInt = *((int*)&hwnd);
        args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_GetDesktopWindowHwnd]::Error: Can't find desktop window"));
    }
}
void mwm_IsWindowVisible(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    // HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    int hwndInt = (int)(args[0]->NumberValue());
    HWND hwnd = (HWND)hwndInt;
    if(hwnd != NULL){
        bool isVisible = IsWindowVisible(hwnd);
        // int hwndInt = *((int*)&hTaskbarWnd);
        // args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
        if(isVisible){
            args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
        }else{
            args.GetReturnValue().Set(v8::Boolean::New(isolate, false));
        }
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_ShowTaskBar]::Error: Can't find Shell_TrayWnd"));
    }
}
void mwm_FindWindow(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    // std::string name = v8::String::Utf8Value(args[0]->ToString());
    // char name[1024] = v8::String::Utf8Value(args[0]->ToString());
    // get the param
    v8::String::Utf8Value param1(args[0]->ToString());

    // convert it to string
    std::string foo = std::string(*param1);

    HWND hwnd = FindWindow(NULL, foo.c_str());
    int hwndInt = *((int*)&hwnd);

    args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
}
void mwm_MoveWindow(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int hwndInt = (int)(args[0]->NumberValue());
    int x = (int)(args[1]->NumberValue());
    int y = (int)(args[2]->NumberValue());
    int w = (int)(args[3]->NumberValue());
    int h = (int)(args[4]->NumberValue());

    HWND hwnd = (HWND)hwndInt;

    SetWindowPos(hwnd, HWND_TOP, x, y, w, h, SWP_SHOWWINDOW);
}

void mwm_MoveForegroundWindow(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int x = (int)(args[0]->NumberValue());
    int y = (int)(args[1]->NumberValue());
    int w = (int)(args[2]->NumberValue());
    int h = (int)(args[3]->NumberValue());
    HWND hwnd = GetForegroundWindow();
    SetWindowPos(hwnd, HWND_TOP, x, y, w, h, SWP_SHOWWINDOW);
}

void mwm_SetForegroundWindowRegion(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int x = (int)(args[0]->NumberValue());
    int y = (int)(args[1]->NumberValue());
    int w = (int)(args[2]->NumberValue());
    int h = (int)(args[3]->NumberValue());

    HWND hwnd = GetForegroundWindow();
    HRGN hrgn = CreateRectRgn(x,y,w,h);
    SetWindowRgn(hwnd, hrgn, TRUE);
    DeleteObject(hrgn);
}
void mwm_GetForegroundWindowHwndAsString(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    HWND hwnd = GetForegroundWindow();

    char szBuff[64];
    sprintf(szBuff, "%p", hwnd);
    // MessageBox(NULL, szBuff, "Title", MB_OK);

    args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, szBuff));
}
void mwm_GetForegroundWindowHwndAsInt(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();

    HWND hwnd = GetForegroundWindow();
    int hwndInt = *((int*)&hwnd);

    args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
}
void mwm_SetParentAsDesktop(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    // HWND hTaskbarWnd = FindWindow(TEXT("Shell_TrayWnd"), NULL);
    int hwndInt = (int)(args[0]->NumberValue());
    HWND hwnd = (HWND)hwndInt;
    if(hwnd != NULL){
        // bool isVisible = IsWindowVisible(hwnd);
        // int hwndInt = *((int*)&hTaskbarWnd);
        // args.GetReturnValue().Set(v8::Number::New(isolate, hwndInt));
        // if(isVisible){
        //     args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
        // }else{
        //     args.GetReturnValue().Set(v8::Boolean::New(isolate, false));
        // }
        SetParent(NULL, hwnd);
    }else{
        args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "[mwm_SetParentAsDesktop]::Error: Can't find Shell_TrayWnd"));
    }
}
void mwm_ShowWindow(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int hwndInt = (int)(args[0]->NumberValue());
    int nCmdShow = (int)(args[1]->NumberValue());

    HWND hwnd = (HWND)hwndInt;
    int i;
    // Used to fix bug with focus going back to previous window
    for(i = 0; i < 5; i++){
        SetForegroundWindow(hwnd);
        // ShowWindow(hwnd, SW_SHOW);
        // SwitchToThisWindow(hwnd, false);
        Sleep(30);
    }
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);
    // SwitchToThisWindow(hwnd, false);


    // BOOL b = ShowWindow(hwnd, SW_SHOW);
    // BOOL b = ShowWindowAsync(hwnd, SW_SHOW);
    // BOOL b = ShowWindow(hwnd, SW_SHOWNORMAL);
    // BOOL b = ShowWindow(hwnd, SW_HIDE);
    // SetWindowPos(hwnd, HWND_TOP, 0, 0, 500, 500, SWP_SHOWWINDOW | SWP_NOMOVE | SWP_NOSIZE);
    // SetWindowPos(hwnd, HWND_TOP, 0, 0, 500, 500, SWP_SHOWWINDOW);

    // args.GetReturnValue().Set(v8::Boolean::New(isolate, b));

    // SetWindowPos(hwnd, HWND_TOP, 0, 0, 500, 600, SWP_SHOWWINDOW);
    // SetForegroundWindow(hwnd);
    // MessageBox(NULL, "mwm_ShowWindow", "Moved Window", MB_ICONINFORMATION);

}
void mwm_SetForegroundWindow(const v8::FunctionCallbackInfo<v8::Value>& args){
    v8::Isolate* isolate = args.GetIsolate();
    int hwndInt = (int)(args[0]->NumberValue());
    HWND hwnd = (HWND)hwndInt;
    SetForegroundWindow(hwnd);
}

//
HHOOK _hook;
LRESULT __stdcall HookMouseCallback(int nCode, WPARAM wParam, LPARAM lParam){
    if (nCode >= 0)
    {
        //MessageBox(NULL, "Mouse", "Mouse Info", MB_ICONINFORMATION);
        return 1;
    }

    // call the next hook in the hook chain. This is nessecary or your hook chain will break and the hook stops
    return CallNextHookEx(_hook, nCode, wParam, lParam);
}
void SetMouseHook(){
    if (!(_hook = SetWindowsHookEx(WH_MOUSE_LL, HookMouseCallback, NULL, 0)))  // TODO: HOOK WndProc and look at sending WM_COPYDATA message
    {
        MessageBox(NULL, "Failed to install hook!", "Error", MB_ICONERROR);
    }

}
void ReleaseMouseHook(){
    UnhookWindowsHookEx(_hook);
}
void mwm_EnableMouse(const v8::FunctionCallbackInfo<v8::Value>& args){
    ReleaseMouseHook();
}
void mwm_DisableMouse(const v8::FunctionCallbackInfo<v8::Value>& args){
    SetMouseHook();
}


void init(v8::Local<v8::Object> exports) {
    // Taskbar
    NODE_SET_METHOD(exports, "disableTaskBar", mwm_DisableTaskBar);
    NODE_SET_METHOD(exports, "enableTaskBar", mwm_EnableTaskBar);
    NODE_SET_METHOD(exports, "hideTaskBar", mwm_HideTaskBar);
    NODE_SET_METHOD(exports, "showTaskbar", mwm_ShowTaskBar);
    NODE_SET_METHOD(exports, "isTaskBarVisible", mwm_IsTaskBarVisible);
    // Window Handling
    NODE_SET_METHOD(exports, "getTaskBarHwnd", mwm_GetTaskBarHwnd);
    NODE_SET_METHOD(exports, "getDesktopWindowHwnd", mwm_GetDesktopWindowHwnd);
    NODE_SET_METHOD(exports, "getShellWindowHwnd", mwm_GetShellWindowHwnd);
    NODE_SET_METHOD(exports, "isWindowVisible", mwm_IsWindowVisible);
    NODE_SET_METHOD(exports, "findWindow", mwm_FindWindow);
    NODE_SET_METHOD(exports, "moveWindow", mwm_MoveWindow);
    NODE_SET_METHOD(exports, "moveForegroundWindow", mwm_MoveForegroundWindow);
    NODE_SET_METHOD(exports, "setForegroundWindowRegion", mwm_SetForegroundWindowRegion);
    NODE_SET_METHOD(exports, "getForegroundWindowHwndAsString", mwm_GetForegroundWindowHwndAsString);
    NODE_SET_METHOD(exports, "getForegroundWindowHwndAsInt", mwm_GetForegroundWindowHwndAsInt);
    NODE_SET_METHOD(exports, "setParentAsDesktop", mwm_SetParentAsDesktop);
    NODE_SET_METHOD(exports, "showWindow", mwm_ShowWindow);
    NODE_SET_METHOD(exports, "setForegroundWindow", mwm_SetForegroundWindow);

    // Hooking
    NODE_SET_METHOD(exports, "enableMouse", mwm_EnableMouse);
    NODE_SET_METHOD(exports, "disableMouse", mwm_DisableMouse);

    // init_virtual_desktops(exports);
    NODE_SET_METHOD(exports, "getCurrentVirtualDesktopNumber", mwm_vd::GetCurrentVirtualDesktopNumber);
    NODE_SET_METHOD(exports, "switchVirtualDesktop", mwm_vd::SwitchVirtualDesktop);
    NODE_SET_METHOD(exports, "getVirtualDesktopCount", mwm_vd::GetVirtualDesktopCount);
    NODE_SET_METHOD(exports, "getMainWindowVirtualDesktopId", mwm_vd::GetMainWindowVirtualDesktopId);
    NODE_SET_METHOD(exports, "getMainWindowVirtualDesktopNumber", mwm_vd::GetMainWindowVirtualDesktopNumber);
    NODE_SET_METHOD(exports, "getWindowVirtualDesktopNumber", mwm_vd::GetWindowVirtualDesktopNumber);
    NODE_SET_METHOD(exports, "isMainWindowOnCurrentVirtualDesktop", mwm_vd::IsMainWindowOnCurrentVirtualDesktop);

    mwm_vd::init_virtual_desktops(exports);
}

NODE_MODULE(addon, init)

}  // namespace mwm
