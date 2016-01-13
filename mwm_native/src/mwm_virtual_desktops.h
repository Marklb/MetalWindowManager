#ifndef MWM_VIRTUAL_DESKTOPS_H
#define MWM_VIRTUAL_DESKTOPS_H

#include <node.h>
#include <vector>
#include <string>
#include <windows.h>
#include <tchar.h>
#include <Dwmapi.h>


#include "VirtualDesktops.h"

namespace mwm_vd {

void GetCurrentVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args);

void IsMainWindowOnCurrentVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args);

void GetMainWindowVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args);

void GetWindowVirtualDesktopNumber(const v8::FunctionCallbackInfo<v8::Value>& args);

void GuidToString(const GUID &guid, char *s);

void GetMainWindowVirtualDesktopId(const v8::FunctionCallbackInfo<v8::Value>& args);

void GetVirtualDesktopCount(const v8::FunctionCallbackInfo<v8::Value>& args);

void SwitchVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args);

void SwitchWindowToVirtualDesktop(const v8::FunctionCallbackInfo<v8::Value>& args);

HRESULT InitializeVirtualDesktopManager(IVirtualDesktopManager **ppDesktopManager);

HRESULT InitializeVirtualDesktopManagerInternal(IVirtualDesktopManagerInternal **ppDesktopManager);

void init_virtual_desktops(v8::Local<v8::Object> exports);

}

#endif
