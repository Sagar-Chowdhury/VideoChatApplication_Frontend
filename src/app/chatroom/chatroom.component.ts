import { Component, ElementRef, ViewChild } from '@angular/core';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';



function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}
export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {
  @ViewChild('root')
  root!: ElementRef;
 
  
ngAfterViewInit() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const userID = Math.floor(Math.random() * 10000) + "";
  const userName = "userName" + userID;
  const appID = 102790012;
  const serverSecret = "38a9618d0704f58b8be4622f82867b17";
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);
  const container = this.root.nativeElement
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(kitToken);

   
    // start the call
    // Start a call.
   zp.joinRoom({
      container,
      sharedLinks: [{
      name: 'Personal link',
      url: window.location.protocol + '//' + window.location.host  + window.location.pathname + '?roomID=' + roomID,
      }],
      scenario: {
      mode: ZegoUIKitPrebuilt.VideoConference,
      },
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      showRemoveUserButton: true,
      });
  }

}  



