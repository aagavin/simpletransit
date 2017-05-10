import { Pipe } from '@angular/core';

@Pipe({ name: 'relativeSeconds' })
export class TimeDifference {
  transform(value, args) {
    return this.secondsToTime(value);
  }

  private secondsToTime(secs):string {

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    if (minutes===0) {
      return seconds+' sec';
    } else {
      return minutes+' min '+seconds+' sec';  
    }
  }


}