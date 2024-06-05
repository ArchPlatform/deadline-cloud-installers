Unicode True
;--------------------------------
;Include extra libraries
!addplugindir ".\windows"
!include LogicLib.nsh
!include FileFunc.nsh
!insertmacro Locate

Var /GLOBAL switch_overwrite
!include .\windows\MoveFileFolder.nsh

!include .\windows\StrRep.nsh
!include .\windows\ReplaceInFile.nsh
!include .\windows\nsDialogs_createTextMultiline.nsh
!include "Sections.nsh"

; Macros
!include Util.nsh
!define LogLine "!insertmacro WriteLineToFile"
!macro WriteLineToFile file line
Push `${line}`
Push "${file}"
!insertmacro CallArtificialFunction WriteLineToFileHelper
DetailPrint "${line}"
!macroend
!macro WriteLineToFileHelper
Exch $0
Exch
Exch $1
FileOpen $0 $0 a
StrCmp $0 "" done
FileSeek $0 0 END
FileWrite $0 "$1$\r$\n"
FileClose $0
done:
Pop $1
Pop $0
!macroend

;--------------------------------
;Allow commandline parameters
!insertmacro GetParameters
!insertmacro GetOptions

;--------------------------------
;Include Modern UI

!include "MUI2.nsh"
!include nsDialogs.nsh

;--------------------------------
;General Data
!define INFO_PROJECTNAME    "deadline-cloud-submitters"
!define INFO_COMPANYNAME    "Arch Platform Technologies"
!define INFO_PRODUCTNAME    "Deadline Cloud Submitters - Arch"
# We will have to create a script to replace the `REPLACE_PRODUCT_VERSION` with the GITHUB_REF
;!define INFO_PRODUCTVERSION "REPLACE_PRODUCT_VERSION"
;TODO: Remove this
!define INFO_PRODUCTVERSION "0.1.0"
!define INFO_COPYRIGHT      "Copyright 2024 Arch Platform Technologies"

;!define PRODUCT_EXECUTABLE  "deadline-cloud-submitters.exe"

!define ARCH "x86-64"
!ifndef UNINST_KEY_NAME
    !define UNINST_KEY_NAME "${INFO_COMPANYNAME}${INFO_PRODUCTNAME}"
!endif
!define UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINST_KEY_NAME}"

ShowInstDetails show

;--------------------------------
;Setup Windows metadata
VIProductVersion "${INFO_PRODUCTVERSION}.0"
VIFileVersion    "${INFO_PRODUCTVERSION}.0"

VIAddVersionKey "CompanyName"     "${INFO_COMPANYNAME}"
VIAddVersionKey "FileDescription" "${INFO_PRODUCTNAME} Installer"
VIAddVersionKey "ProductVersion"  "${INFO_PRODUCTVERSION}"
VIAddVersionKey "FileVersion"     "${INFO_PRODUCTVERSION}"
VIAddVersionKey "LegalCopyright"  "${INFO_COPYRIGHT}"
VIAddVersionKey "ProductName"     "${INFO_PRODUCTNAME}"
;--------------------------------
;General
Name "${INFO_PRODUCTNAME}"
OutFile "${INFO_PROJECTNAME}-${ARCH}-installer.exe"

Icon ".\resources\icon.ico"
UninstallIcon ".\resources\icon.ico"
;Default installation folder
InstallDir "$LocalAppData"

;;;;Request application privileges for Windows Vista
;;;RequestExecutionLevel user
;Request admin privileges
!define REQUEST_EXECUTION_LEVEL "admin"
RequestExecutionLevel "${REQUEST_EXECUTION_LEVEL}"

; -----------------------------
;Variables that we may need later in the script
Var DefaultUnrealPluginDirectoryTextBox
Var DefaultUnrealPluginDirectory
Var InstallationOverviewListBox
Var InstallationOverviewMessage
Var InstallationOverviewMessageDeadlineClient
Var InstallationOverviewMessageDeadlineForNuke
Var InstallationOverviewMessageDeadlineForMaya
Var InstallationOverviewMessageDeadlineForHoudini
Var InstallationOverviewMessageDeadlineForKeyShot
Var InstallationOverviewMessageDeadlineForBlender
Var InstallationOverviewMessageDeadlineForUnrealEngine
Var InstallationOverviewMessageDeadlineForCinema4D
Var InstallationOverviewMessageDeadlineForAfterEffects
Var DidAfterEffectsPluginInstall
Var AfterEffectsVersion

Var ExitCode
Var StdOutText

;--------------------------------
;Submitters Version Info
!define DEADLINE_CLOUD_EXECUTABLE_NAME "deadline-cli-0.48.1.zip"
!define DEADLINE_CLOUD_LIBRARY_NAME "deadline-0.48.1-py3-none-any.whl"
!define DEADLINE_CLOUD_LIBRARY_DEPS "deadline-deps-0.48.1-windows.zip"
!define CINEMA_4D_PLUGIN_NAME "DeadlineCloud-0.3.2.pyp"
!define CINEMA_4D_LIBRARY_NAME "deadline_cloud_for_cinema_4d-0.3.2-py3-none-any.whl"
!define AFTER_EFFECTS_PLUGIN_NAME "DeadlineCloudSubmitter-0.1.2.jsx"
!define MAYA_LIBRARY_NAME "deadline_cloud_for_maya-0.14.1-py3-none-any.whl"

;--------------------------------
; General Image settings
!define MUI_ICON ".\resources\icon.ico"
!define MUI_UNICON ".\resources\icon.ico"
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP ".\resources\header.bmp"
!define MUI_HEADERIMAGE_UNBITMAP ".\resources\header.bmp"
!define MUI_HEADERIMAGE_RIGHT
!define MUI_WELCOMEFINISHPAGE_BITMAP ".\resources\welcome.bmp"
!define MUI_UNWELCOMEFINISHPAGE_BITMAP ".\resources\welcome.bmp"

;--------------------------------
;defines MUST come before pages to apply to them (in hindsight: duh!)
!define MUI_ABORTWARNING
!define MUI_ABORTWARNING_TEXT "Do you want to abort the installation process?"

!define MUI_WELCOMEPAGE_TITLE "Setup - AWS Deadline Cloud Submitter"
!define MUI_WELCOMEPAGE_TEXT "Welcome to the AWS Deadline Cloud Submitter Setup Wizard."

!define MUI_COMPONENTSPAGE_TEXT_TOP "Select the components you want to install; clear the components you do not want to install. Click Next when you are ready to continue."
;!define MUI_COMPONENTSPAGE_TEXT_COMPLIST " "
;!define MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_TITLE "MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_TITLE"
;!define MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_INFO "MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_INFO"
!define MUI_COMPONENTSPAGE_TEXT_DESCRIPTION_INFO "Hover over a component to get a detailed description"

;SpaceTexts none

; Show desc
!define MUI_UI_COMPONENTSPAGE_SMALLDESC


!define MUI_DIRECTORYPAGE_TEXT_TOP "Please specify the directory where AWS Deadline Cloud Submitter will be installed."
!define MUI_DIRECTORYPAGE_TEXT_DESTINATION "Installation Directory"
!define MUI_DIRECTORYPAGE_VARIABLE $INSTDIR

!define MUI_FINISHPAGE_TITLE "Completing the AWS Deadline Cloud Submitter Setup Wizard"
!define MUI_FINISHPAGE_TEXT "Set has finished installing AWS Deadline Cloud Submitter on your computer."

!define MUI_FINISHPAGE_NOREBOOTSUPPORT
;--------------------------------
;Pages

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_COMPONENTS
Page Custom CheckInstalledAfterEffectsVersion
Page Custom CreateUnrealEnginePluginPage LeaveUnrealEnginePluginPage
Page Custom CreateInstallationOverview LeaveInstallationOverview
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

;!insertmacro MUI_UNPAGE_WELCOME
;!insertmacro MUI_UNPAGE_CONFIRM
;!insertmacro MUI_UNPAGE_INSTFILES
;!insertmacro MUI_UNPAGE_FINISH

;--------------------------------
;Custom Pages

;--------------------------------
;Languages

!insertmacro MUI_LANGUAGE "English"

;--------------------------------
;Installer Sections

Section "Deadline Cloud" deadline_cloud
	;MessageBox MB_OK "Deadline Cloud"
	/*
	Deadline Client
- Installs the Deadline Client CLI application to the installation directory
- Updates the PATH environment variable to include the path to the Deadline Client CLI
- Installs the Deadline protocol handler to handle the "deadline" URI scheme (e.g. for downloading job output)
- Configures the Deadline Client as specified in the installer
	*/
    ${LogLine} "$INSTDIR\install.log" "Starting installing Deadline Cloud DeadlineClient"
    SetShellVarContext all
    ${LogLine} "$INSTDIR\install.log" "Creating temp directory"
    CreateDirectory "$INSTDIR\tmp"
    ${LogLine} "$INSTDIR\install.log" "Creating DeadlineClient folder"
    CreateDirectory "$INSTDIR\DeadlineClient"

    SetOutPath "$INSTDIR\tmp"
    File ".\dist\${DEADLINE_CLOUD_LIBRARY_NAME}"
    File ".\dist\${DEADLINE_CLOUD_LIBRARY_DEPS}"

    ${LogLine} "$INSTDIR\install.log" "Extracting ${DEADLINE_CLOUD_EXECUTABLE_NAME}"
    File ".\dist\${DEADLINE_CLOUD_EXECUTABLE_NAME}"
    nsisunz::UnzipToStack "$INSTDIR\tmp\${DEADLINE_CLOUD_EXECUTABLE_NAME}" "$INSTDIR\DeadlineClient"
    Pop $0
    StrCmp $0 "success" ok
      ${LogLine} "$INSTDIR\install.log" "Error: $0"
      Goto skiplist
    ok:
    ; Print out list of files extracted to log
    next:
      Pop $0
      ${LogLine} "$INSTDIR\install.log" "  $0"
    StrCmp $0 "" 0 next ; pop strings until a blank one arrives

    skiplist:

    ${LogLine} "$INSTDIR\install.log" "Updating PATH variable"
    EnVar::AddValue "path" "$INSTDIR\DeadlineClient"

    ${LogLine} "$INSTDIR\install.log" "Adding URI Handler"
    SetRegView 64
    WriteRegStr HKCR "deadline" "URL Protocol" ""
    WriteRegStr HKCR "deadline\shell\open\command" "" '"$INSTDIR\DeadlineClient\deadline.exe" "handle-web-url" "%1"'
    ${LogLine} "$INSTDIR\install.log" "Finished installing DeadlineClient"

SectionEnd
LangString DESC_deadline_cloud ${LANG_ENGLISH} "CLI for interfacing with Deadline."

Section "Deadline Cloud for Maya" deadline_cloud_for_maya
	/*
Deadline Cloud for Maya 2024
- Compatible with Maya 2024.
- Install the integrated Maya submitter files to the installation directory.
- Register the plug-in with Maya by creating or updating the MAYA_MODULE_PATH environment variable.

- whl goes into $INST\Submitters\Maya\scripts
- Move $INST\Submitters\Maya\scripts\deadline\maya_submitter\maya_submitter_plugin\* to $INST\Submitters\Maya\
	*/
	${LogLine} "$INSTDIR\install.log" "Starting installing Deadline Cloud Maya"
    SetShellVarContext all
    CreateDirectory "$INSTDIR\Submitters\Maya"
    ${LogLine} "$INSTDIR\install.log" "Creating Maya scripts directory"
    CreateDirectory "$INSTDIR\Submitters\Maya\scripts"

    ; Install the deadline-cloud-for-maya libraries
    SetOutPath "$INSTDIR\tmp"
    ${LogLine} "$INSTDIR\install.log" "Installing ${MAYA_LIBRARY_NAME}, ${DEADLINE_CLOUD_LIBRARY_NAME} and dependencies"
    File ".\dist\${MAYA_LIBRARY_NAME}"
    nsisunz::UnzipToStack "$INSTDIR\tmp\${MAYA_LIBRARY_NAME}" "$INSTDIR\Submitters\Maya\scripts"
    Pop $0
    StrCmp $0 "success" ok
      DetailPrint "$0" ;print error message to log
      ${LogLine} "$INSTDIR\install.log" "Error: $0"
      Goto skiplist
    ok:
    ; Print out list of files extracted to log
    next:
      Pop $0
      DetailPrint $0
      ${LogLine} "$INSTDIR\install.log" "  $0"
    StrCmp $0 "" 0 next ; pop strings until a blank one arrives

    skiplist:

    nsisunz::UnzipToStack "$INSTDIR\tmp\${DEADLINE_CLOUD_LIBRARY_DEPS}" "$INSTDIR\Submitters\Maya\scripts"
    Pop $0
    StrCmp $0 "success" ok2
      DetailPrint "$0" ;print error message to log
      ${LogLine} "$INSTDIR\install.log" "Error: $0"
      Goto skiplist2
    ok2:
    ; Print out list of files extracted to log
    next2:
      Pop $0
      DetailPrint $0
      ${LogLine} "$INSTDIR\install.log" "  $0"
    StrCmp $0 "" 0 next2 ; pop strings until a blank one arrives

    skiplist2:

    ${LogLine} "$INSTDIR\install.log" "Moving bundled module files to $INSTDIR\Submitters\Maya"
    !insertmacro MoveFolder "$INSTDIR\Submitters\Maya\scripts\deadline\maya_submitter\maya_submitter_plugin\" "$INSTDIR\Submitters\Maya\" "*.*"
    RMDir /r "$INSTDIR\Submitters\Maya\scripts\deadline\maya_submitter\maya_submitter_plugin"

    ${LogLine} "$INSTDIR\install.log" "Adding MAYA_MODULE_PATH variable"
    EnVar::AddValue "MAYA_MODULE_PATH" "$INSTDIR\Submitters\Maya"
    ${LogLine} "$INSTDIR\install.log" "Finished installing Deadline Cloud Maya"
SectionEnd
LangString DESC_deadline_cloud_for_maya ${LANG_ENGLISH} "Maya plugin for submitting jobs to AWS Deadline Cloud. Compatible with Maya 2023+"

Section "Deadline Cloud for Nuke" deadline_cloud_for_nuke
	MessageBox MB_OK "Deadline Cloud for Nuke"
	/*
Deadline Cloud for Nuke 14.0-15.0
- Compatible with Nuke 14.0-15.0
- Install the integrated Nuke submitter files to the installation directory
- Register the plug-in with Nuke by creating or updating the NUKE_PATH environment variable.
	*/
SectionEnd
LangString DESC_deadline_cloud_for_nuke ${LANG_ENGLISH} "Nuke plugin for submitting jobs to AWS Deadline Cloud. Compatible with Nuke 14.0+"

Section "Deadline Cloud for Houdini" deadline_cloud_for_houdini
	MessageBox MB_OK "Deadline Cloud for Houdini"
	/*
Deadline Cloud for Houdini 19.5
- Compatible with Houdini 19.5.
- Install the integrated Houdini submitter files to the installation directory.
- Register the plug-in with Houdini by installing and configuring a package file.
	*/
SectionEnd
LangString DESC_deadline_cloud_for_houdini ${LANG_ENGLISH} "Houdini plugin for submitting jobs to AWS Deadline Cloud. Compatible with Houdini 19.5+"

Section "Deadline Cloud for KeyShot" deadline_cloud_for_keyshot
	MessageBox MB_OK "Deadline Cloud for KeyShot"
	/*
Deadline Cloud for KeyShot
- Install the integrated KeyShot submitter files to the installation directory
- Register the plug-in with KeyShot by moving the Submit to AWS Deadline Cloud script to the KeyShot scripts folder
- Sets the DEADLINE_KEYSHOT environment variable to point the Submit to AWS Deadline Cloud script to the submitter module
	*/

	/*
No installation of KeyShot 12 was found. Please manually
move the 'Submit to AWS Deadline Cloud.py' script into the
KeyShot scripts folder to use the plug-in.
	*/
SectionEnd
LangString DESC_deadline_cloud_for_keyshot ${LANG_ENGLISH} "KeyShot plugin for submitting jobs to AWS Deadline Cloud. Compatible with KeyShot 12+"

Section "Deadline Cloud for Blender" deadline_cloud_for_blender
	MessageBox MB_OK "Deadline Cloud for Blender"
	/*
Deadline Cloud for Blender 3.6
- Compatible with Blender 3.6
- Install the integrated Blender submitter files to the installation directory
	*/
SectionEnd
LangString DESC_deadline_cloud_for_blender ${LANG_ENGLISH} "Blender plugin for submitting jobs to AWS Deadline Cloud. Compatible with Blender 3.6+"

Section "Deadline Cloud for Unreal Engine" deadline_cloud_for_unreal_engine
	MessageBox MB_OK "Deadline Cloud for Unreal Engine"
	/*
Deadline Cloud for Unreal Engine 5.2.1
- Compatible with Unreal Engine 5
- Install the Unreal Engine submitter files to the Plugin directory
	*/
SectionEnd
LangString DESC_deadline_cloud_for_unreal_engine ${LANG_ENGLISH} "Unreal Engine plugin for submitting jobs to AWS Deadline Cloud. Compatible with Unreal Engine 5+"

Section "Deadline Cloud for Cinema 4D" deadline_cloud_for_cinema_4d
	;MessageBox MB_OK "Deadline Cloud for Cinema 4D"
	/*
Deadline Cloud for Cinema 4D S26
- Compatible with Cinema 4D S26+.
- Install DeadlineCloud.pyp plug-in to the installation directory.
- Register the plug-in with Cinema 4D by creating or updating the g_additionalModulePath environment variable.
- Install the deadline-cloud-for-cinema-4d libraries to the installation directory
- Register the libraries with Deadline Cloud by creating or updating the CINEMA4D_DEADLINE_CLOUD_PYTHONPATH environment variable.
# TODO: Install PySide2 dependency with this
	*/
	${LogLine} "$INSTDIR\install.log" "Starting installing Deadline Cloud Cinema 4D"
    SetShellVarContext all
    CreateDirectory "$INSTDIR\Submitters\Cinema4D"
    ${LogLine} "$INSTDIR\install.log" "Creating C4D Plugins directory"
    CreateDirectory "$INSTDIR\Submitters\Cinema4D\Plugins"

    ; Install the pyp plugin
    SetOutPath "$INSTDIR\Submitters\Cinema4D\Plugins"
    ${LogLine} "$INSTDIR\install.log" "Installing ${CINEMA_4D_PLUGIN_NAME}"
    File ".\dist\${CINEMA_4D_PLUGIN_NAME}"
    Rename $INSTDIR\Submitters\Cinema4D\Plugins\${CINEMA_4D_PLUGIN_NAME} $INSTDIR\Submitters\Cinema4D\Plugins\DeadlineCloud.pyp
    ${LogLine} "$INSTDIR\install.log" "Adding g_additionalModulePath variable"
    EnVar::AddValue "g_additionalModulePath" "$INSTDIR\Submitters\Cinema4D\Plugins"

    ; Install the deadline-cloud-for-cinema-4d libraries
    SetOutPath "$INSTDIR\tmp"
    ${LogLine} "$INSTDIR\install.log" "Installing ${CINEMA_4D_LIBRARY_NAME}, ${DEADLINE_CLOUD_LIBRARY_NAME} and dependencies"
    File ".\dist\${CINEMA_4D_LIBRARY_NAME}"
    ;Exec 'python.exe -m pip install "$INSTDIR\tmp\${CINEMA_4D_LIBRARY_NAME}" --target "$INSTDIR\Submitters\Cinema4D"'
    nsisunz::UnzipToStack "$INSTDIR\tmp\${CINEMA_4D_LIBRARY_NAME}" "$INSTDIR\Submitters\Cinema4D"
    Pop $0
    StrCmp $0 "success" ok
      DetailPrint "$0" ;print error message to log
      ${LogLine} "$INSTDIR\install.log" "Error: $0"
      Goto skiplist
    ok:
    ; Print out list of files extracted to log
    next:
      Pop $0
      DetailPrint $0
      ${LogLine} "$INSTDIR\install.log" "  $0"
    StrCmp $0 "" 0 next ; pop strings until a blank one arrives

    skiplist:

    nsisunz::UnzipToStack "$INSTDIR\tmp\${DEADLINE_CLOUD_LIBRARY_DEPS}" "$INSTDIR\Submitters\Cinema4D"
    Pop $0
    StrCmp $0 "success" ok2
      DetailPrint "$0" ;print error message to log
      ${LogLine} "$INSTDIR\install.log" "Error: $0"
      Goto skiplist2
    ok2:
    ; Print out list of files extracted to log
    next2:
      Pop $0
      DetailPrint $0
      ${LogLine} "$INSTDIR\install.log" "  $0"
    StrCmp $0 "" 0 next2 ; pop strings until a blank one arrives

    skiplist2:

    ${LogLine} "$INSTDIR\install.log" "Adding CINEMA4D_DEADLINE_CLOUD_PYTHONPATH"
    EnVar::AddValue "CINEMA4D_DEADLINE_CLOUD_PYTHONPATH" "$INSTDIR\Submitters\Cinema4D"
    ${LogLine} "$INSTDIR\install.log" "Finished installing Deadline Cloud Cinema 4D"
SectionEnd
LangString DESC_deadline_cloud_for_cinema_4d ${LANG_ENGLISH} "Cinema 4D plugin for submitting jobs to AWS Deadline Cloud. Compatible with Cinema 4D S26+"

Section "Deadline Cloud for After Effects" deadline_cloud_for_after_effects
	;MessageBox MB_OK "Deadline Cloud for After Effects"
	/*
Deadline Cloud for After Effects 2023
- Compatible with After Effects 2023+.
- Install the DeadlineCloudSubmitter.jsx plug-in to the scripts directory of After Effects.
	*/

    ${LogLine} "$INSTDIR\install.log" "Starting installing Deadline Cloud After Effects"
    SetShellVarContext all

    ${ForEach} $AfterEffectsVersion 2023 2025 + 1
        ${If} ${FileExists} "C:\Program Files\Adobe\Adobe After Effects $AfterEffectsVersion\Support Files\Scripts"
            ${LogLine} "$INSTDIR\install.log" "  Found After Effects $AfterEffectsVersion"
            SetOutPath "C:\Program Files\Adobe\Adobe After Effects $AfterEffectsVersion\Support Files\Scripts"
            File ".\dist\${AFTER_EFFECTS_PLUGIN_NAME}"
            Rename "C:\Program Files\Adobe\Adobe After Effects $AfterEffectsVersion\Support Files\Scripts\${AFTER_EFFECTS_PLUGIN_NAME}" "C:\Program Files\Adobe\Adobe After Effects $AfterEffectsVersion\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
            StrCpy $DidAfterEffectsPluginInstall "1"
        ${EndIf}
    ${Next}
    ${LogLine} "$INSTDIR\install.log" "Finished installing Deadline Cloud After Effects"
SectionEnd
LangString DESC_deadline_cloud_for_after_effects ${LANG_ENGLISH} "After Effects plugin for submitting jobs to AWS Deadline Cloud. Compatible with After Effects 2023+"

!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud} $(DESC_deadline_cloud)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_maya} $(DESC_deadline_cloud_for_maya)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_nuke} $(DESC_deadline_cloud_for_nuke)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_houdini} $(DESC_deadline_cloud_for_houdini)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_keyshot} $(DESC_deadline_cloud_for_keyshot)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_blender} $(DESC_deadline_cloud_for_blender)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_unreal_engine} $(DESC_deadline_cloud_for_unreal_engine)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_cinema_4d} $(DESC_deadline_cloud_for_cinema_4d)
  !insertmacro MUI_DESCRIPTION_TEXT ${deadline_cloud_for_after_effects} $(DESC_deadline_cloud_for_after_effects)
!insertmacro MUI_FUNCTION_DESCRIPTION_END

;--------------------------------
; Functions
Function .onInit

    StrCpy $switch_overwrite 0
    InitPluginsDir
    StrCpy $INSTDIR "C:\Program Files\DeadlineCloudSubmitter"

    !insertmacro SelectSection ${deadline_cloud}
    !insertmacro SetSectionFlag ${deadline_cloud} ${SF_RO}
    !insertmacro UnselectSection ${deadline_cloud_for_maya}
    !insertmacro UnselectSection ${deadline_cloud_for_nuke}
    !insertmacro UnselectSection ${deadline_cloud_for_houdini}
    !insertmacro UnselectSection ${deadline_cloud_for_keyshot}
    !insertmacro UnselectSection ${deadline_cloud_for_blender}
    !insertmacro UnselectSection ${deadline_cloud_for_unreal_engine}
    !insertmacro UnselectSection ${deadline_cloud_for_cinema_4d}
    !insertmacro UnselectSection ${deadline_cloud_for_after_effects}

    StrCpy $DefaultUnrealPluginDirectory "C:\Program Files\Epic Games\UE_5.2\Engine\Plugins\UnrealDeadlineCloudService"

    StrCpy $InstallationOverviewMessageDeadlineClient "Deadline Client$\r$\n- Installs the Deadline Client CLI application to the installation directory$\r$\n- Updates the PATH environment variable to include the path to the Deadline Client CLI$\r$\n- Installs the Deadline protocol handler to handle the deadline:// URI scheme (e.g. for downloading job output)$\r$\n- Configures the Deadline Client as specified in the installer"
    StrCpy $InstallationOverviewMessageDeadlineForNuke "Deadline Cloud for Nuke 14.0-15.0$\r$\n- Compatible with Nuke 14.0-15.0$\r$\n- Install the integrated Nuke submitter files to the installation directory$\r$\n- Register the plug-in with Nuke by creating or updating the NUKE_PATH environment variable."
    StrCpy $InstallationOverviewMessageDeadlineForMaya "Deadline Cloud for Maya 2024$\r$\n- Compatible with Maya 2024.$\r$\n- Install the integrated Maya submitter files to the installation directory.$\r$\n- Register the plug-in with Maya by creating or updating the MAYA_MODULE_PATH environment variable."
    StrCpy $InstallationOverviewMessageDeadlineForHoudini "Deadline Cloud for Houdini 19.5$\r$\n- Compatible with Houdini 19.5.$\r$\n- Install the integrated Houdini submitter files to the installation directory.$\r$\n- Register the plug-in with Houdini by installing and configuring a package file."
    StrCpy $InstallationOverviewMessageDeadlineForKeyShot "Deadline Cloud for KeyShot$\r$\n- Install the integrated KeyShot submitter files to the installation directory$\r$\n- Register the plug-in with KeyShot by moving the Submit to AWS Deadline Cloud script to the KeyShot scripts folder$\r$\n- Sets the DEADLINE_KEYSHOT environment variable to point the Submit to AWS Deadline Cloud script to the submitter module"
    StrCpy $InstallationOverviewMessageDeadlineForBlender "Deadline Cloud for Blender 3.6$\r$\n- Compatible with Blender 3.6$\r$\n- Install the integrated Blender submitter files to the installation directory"
    StrCpy $InstallationOverviewMessageDeadlineForUnrealEngine "Deadline Cloud for Unreal Engine 5.2.1$\r$\n- Compatible with Unreal Engine 5$\r$\n- Install the Unreal Engine submitter files to the Plugin directory"
    StrCpy $InstallationOverviewMessageDeadlineForCinema4D "Deadline Cloud for Cinema 4D S26$\r$\n- Compatible with Cinema 4D S26+.$\r$\n- Install DeadlineCloud.pyp plug-in to the installation directory.$\r$\n- Register the plug-in with Cinema 4D by creating or updating the g_additionalModulePath environment variable.$\r$\n- Install the deadline-cloud-for-cinema-4d libraries to the installation directory$\r$\n- Register the libraries with Deadline Cloud by creating or updating the CINEMA4D_DEADLINE_CLOUD_PYTHONPATH environment variable."
    StrCpy $InstallationOverviewMessageDeadlineForAfterEffects "Deadline Cloud for After Effects 2023$\r$\n- Compatible with After Effects 2023+.$\r$\n- Install the DeadlineCloudSubmitter.jsx plug-in to the scripts directory of After Effects."
FunctionEnd

Function .onInstFailed
    Call RemoveAll
FunctionEnd

;Function .onUserAbort
;    MessageBox MB_YESNO "Do you want to abort the installation process?" IDYES NoCancelAbort
;        Abort ; causes installer to not quit.
;    NoCancelAbort:
;        Call RemoveAll
;FunctionEnd

Function CheckInstalledAfterEffectsVersion
    ${If} ${SectionIsSelected} ${deadline_cloud_for_after_effects}
        ${ForEach} $AfterEffectsVersion 2023 2025 + 1
            ${If} ${FileExists} "C:\Program Files\Adobe\Adobe After Effects $AfterEffectsVersion\Support Files\Scripts"
                ${LogLine} "$INSTDIR\install.log" "  Found After Effects $AfterEffectsVersion"
                StrCpy $DidAfterEffectsPluginInstall "1"
            ${EndIf}
        ${Next}
        ${LogLine} "$INSTDIR\install.log" "Did we find a version of After Effects Installed? $DidAfterEffectsPluginInstall"
        ${If} $DidAfterEffectsPluginInstall != "1"
            ${LogLine} "$INSTDIR\install.log" "Error: We did not find a version of After Effects Installed"
            MessageBox MB_OK "Deadline Cloud for After Effects could not find an installed After Effects installation."
            !insertmacro UnselectSection ${deadline_cloud_for_after_effects}
            Abort "Install failed. Deadline Cloud for After Effects could not find an installed After Effects installation.$\r$\nDeadline Cloud for After Effects will be unchecked"
        ${EndIf}
    ${EndIf}
FunctionEnd

Function CreateUnrealEnginePluginPage
    ${IfNot} ${SectionIsSelected} ${deadline_cloud_for_unreal_engine}
        Abort
    ${EndIf}
    !insertmacro MUI_HEADER_TEXT "Arch Platform Technologies" "Path to the Deadline Cloud Unreal Plugin directory"
    nsDialogs::Create 1018
    Pop $0
    ${NSD_CreateLabel} 0 0 100% 18u "Deadline Cloud Unreal Plugin directory"
    Pop $0

    ${NSD_CreateGroupBox} 2% 20u 90% 34u "Path to the Deadline Cloud Unreal Plugin directory"
    Pop $0

        ${NSD_CreateDirRequest} 8% 34u 63% 12u "$DefaultUnrealPluginDirectory"
        Pop $DefaultUnrealPluginDirectoryTextBox

        ${NSD_CreateBrowseButton} 72% 34u 15% 12u "Browse..."
        Pop $0
        ${NSD_OnClick} $0 OnUnrealPluginDirectoryBrowse

    nsDialogs::Show

FunctionEnd

Function OnUnrealPluginDirectoryBrowse
    ${NSD_GetText} $DefaultUnrealPluginDirectoryTextBox $0
    nsDialogs::SelectFolderDialog "Select Unreal Plugin Directory" "$0"
    Pop $0
    ${If} $0 != error
        ${NSD_SetText} $DefaultUnrealPluginDirectoryTextBox "$0"
    ${EndIf}
FunctionEnd

Function LeaveUnrealEnginePluginPage
    ${NSD_GetText} $DefaultUnrealPluginDirectoryTextBox $DefaultUnrealPluginDirectory
    ${If} ${FileExists} $DefaultUnrealPluginDirectory
      ; file is a directory
    ${Else}
      MessageBox MB_OK "The directory $DefaultUnrealPluginDirectory does not exist"
      Abort
      ; file is neither a file or a directory (i.e. it doesn't exist)
    ${EndIf}
FunctionEnd


Function CreateInstallationOverview
    !insertmacro MUI_HEADER_TEXT "Arch Platform Technologies" "Path to the Deadline Cloud Unreal Plugin directory"
    nsDialogs::Create 1018
    ${NSD_CreateLabel} 0 0 100% 18u "Review the installation"
    Pop $0

    StrCpy $InstallationOverviewMessage "Installation Path: $INSTDIR$\r$\nInstallation Scope: system$\r$\n$\r$\n$\r$\nThe following components will be installed:"
    ${If} ${SectionIsSelected} ${deadline_cloud}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineClient"
    ${EndIf}

    ${If} ${SectionIsSelected} ${deadline_cloud_for_nuke}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForNuke"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_maya}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForMaya"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_houdini}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForHoudini"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_keyshot}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForKeyShot"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_blender}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForBlender"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_unreal_engine}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForUnrealEngine"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_cinema_4d}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForCinema4D"
    ${EndIf}
    ${If} ${SectionIsSelected} ${deadline_cloud_for_after_effects}
        StrCpy $InstallationOverviewMessage "$InstallationOverviewMessage$\r$\n$\r$\n$InstallationOverviewMessageDeadlineForAfterEffects"
    ${EndIf}

    ${NSD_CreateTextMultiline} 0 10% 100% 85% "$InstallationOverviewMessage"
    Pop $InstallationOverviewListBox
	SendMessage $InstallationOverviewListBox ${EM_SETREADONLY} 1 0
    nsDialogs::Show
FunctionEnd

Function LeaveInstallationOverview
    ;${NSD_GetText} $DefaultUnrealPluginDirectoryTextBox $DefaultUnrealPluginDirectory
FunctionEnd


Section
    File .\resources\icon.ico
    RMDir /r "$INSTDIR\tmp"
    ${LogLine} "$INSTDIR\install.log" "Writing uninstaller"
    WriteUninstaller "$INSTDIR\uninstall.exe"

    SetRegView 64
    ${LogLine} "$INSTDIR\install.log" "Registering Deadline Cloud Submitters with Windows"
    WriteRegStr HKLM "${UNINST_KEY}" "Publisher" "${INFO_COMPANYNAME}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayName" "${INFO_PRODUCTNAME}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayVersion" "${INFO_PRODUCTVERSION}"
    WriteRegStr HKLM "${UNINST_KEY}" "DisplayIcon" "$INSTDIR\resources\icon.ico"
    WriteRegStr HKLM "${UNINST_KEY}" "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
    WriteRegStr HKLM "${UNINST_KEY}" "QuietUninstallString" "$\"$INSTDIR\uninstall.exe$\" /S"
    RMDir /r "$INSTDIR\tmp"
    ${LogLine} "$INSTDIR\install.log" "Installation finished"
    Sleep 500
    ;Quit
SectionEnd

;--------------------------------
;Uninstaller Section
Function RemoveDeadlineClient
    SetShellVarContext all
    SetRegView 64
    ; Deadline Client
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Client"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing $INSTDIR\DeadlineClient"
    RMDir /r "$INSTDIR\DeadlineClient"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing PATH modifications"
    EnVar::DeleteValue "path" "$INSTDIR\DeadlineClient"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Uninstalling Deadline Client URI Handler"
    DeleteRegKey HKCR "deadline"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Client successfully uninstalled"
FunctionEnd
Function un.RemoveDeadlineClient
    SetShellVarContext all
    SetRegView 64
    ; Deadline Client
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Client"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing $INSTDIR\DeadlineClient"
    RMDir /r "$INSTDIR\DeadlineClient"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing PATH modifications"
    EnVar::DeleteValue "path" "$INSTDIR\DeadlineClient"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Uninstalling Deadline Client URI Handler"
    DeleteRegKey HKCR "deadline"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Client successfully uninstalled"
FunctionEnd

Function RemoveDeadlineCloudForMaya
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for Maya"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing MAYA_MODULE_PATH modifications"
    EnVar::DeleteValue "MAYA_MODULE_PATH" "$INSTDIR\Submitters\Maya"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing $INSTDIR\Submitters\Maya"
    RMDir /r "$INSTDIR\Submitters\Maya"
FunctionEnd
Function un.RemoveDeadlineCloudForMaya
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for Maya"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing MAYA_MODULE_PATH modifications"
    EnVar::DeleteValue "MAYA_MODULE_PATH" "$INSTDIR\Submitters\Maya"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing $INSTDIR\Submitters\Maya"
    RMDir /r "$INSTDIR\Submitters\Maya"
FunctionEnd

Function RemoveDeadlineCloudForCinema4D
    SetShellVarContext all
    SetRegView 64
    ; Deadline Cloud for Cinema 4D
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for Cinema 4D"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing g_additionalModulePAth modifications"
    EnVar::DeleteValue "g_additionalModulePath" "$INSTDIR\Submitters\Cinema4D\Plugins"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing CINEMA4D_DEADLINE_CLOUD_PYTHONPATH modifications"
    EnVar::DeleteValue "CINEMA4D_DEADLINE_CLOUD_PYTHONPATH" "$INSTDIR\Submitters\Cinema4D"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Cloud for Cinema 4D successfully uninstalled"
FunctionEnd
Function un.RemoveDeadlineCloudForCinema4D
    SetShellVarContext all
    SetRegView 64
    ; Deadline Cloud for Cinema 4D
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for Cinema 4D"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing g_additionalModulePAth modifications"
    EnVar::DeleteValue "g_additionalModulePath" "$INSTDIR\Submitters\Cinema4D\Plugins"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Removing CINEMA4D_DEADLINE_CLOUD_PYTHONPATH modifications"
    EnVar::DeleteValue "CINEMA4D_DEADLINE_CLOUD_PYTHONPATH" "$INSTDIR\Submitters\Cinema4D"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Cloud for Cinema 4D successfully uninstalled"
FunctionEnd

Function RemoveDeadlineCloudForAfterEffects
    SetShellVarContext all
    SetRegView 64
    ; Deadline Cloud for After Effects
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for After Effects"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2023"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2024"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2025"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2025\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Cloud for After Effects successfully uninstalled"
FunctionEnd
Function un.RemoveDeadlineCloudForAfterEffects
    SetShellVarContext all
    SetRegView 64
    ; Deadline Cloud for After Effects
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstalling Deadline Cloud for After Effects"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2023"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2024"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2024\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deleting DeadlineCloudSubmitter.jsx from After Effects 2025"
    Delete "C:\Program Files\Adobe\Adobe After Effects 2025\Support Files\Scripts\DeadlineCloudSubmitter.jsx"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "  Deadline Cloud for After Effects successfully uninstalled"
FunctionEnd

Function RemoveAll
    SetShellVarContext all
    SetRegView 64

    Call RemoveDeadlineClient
    Call RemoveDeadlineCloudForMaya
    Call RemoveDeadlineCloudForCinema4D
    Call RemoveDeadlineCloudForAfterEffects

    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Removing any remaining files"
    RMDir /r "$INSTDIR"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Unregistering Deadline Cloud Submitters with Windows"
    DeleteRegKey HKLM "${UNINST_KEY}"
FunctionEnd
Function un.RemoveAll
    SetShellVarContext all
    SetRegView 64

    Call un.RemoveDeadlineClient
    Call un.RemoveDeadlineCloudForMaya
    Call un.RemoveDeadlineCloudForCinema4D
    Call un.RemoveDeadlineCloudForAfterEffects

    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Removing any remaining files"
    RMDir /r "$INSTDIR"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Unregistering Deadline Cloud Submitters with Windows"
    DeleteRegKey HKLM "${UNINST_KEY}"
FunctionEnd

Section "Uninstall"
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Starting uninstall"
    Call un.RemoveAll
    ${LogLine} "$TEMP\deadline_cloud_submitters_uninstall.log" "Uninstall finished"
    ; MessageBox MB_OK "Uninstall Finished"

SectionEnd

