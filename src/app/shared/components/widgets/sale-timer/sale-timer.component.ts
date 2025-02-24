import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sale-timer',
  templateUrl: './sale-timer.component.html',
  styleUrls: ['./sale-timer.component.scss']
})
export class SaleTimerComponent {

  @Input() startDate: string | null;
  @Input() endDate: string | null;
  @Input() title: string | null;

  public remainingTime: any = null;

  ngOnChanges(changes: SimpleChanges) {
    this.startDate = null;
    this.endDate = null;
    this.remainingTime = null;
    if(changes['startDate'] && changes['startDate'].currentValue) {
      this.startDate = changes['startDate']?.currentValue;
      this.endDate = new Date(changes['endDate']?.currentValue).valueOf() > new Date().valueOf() ? changes['endDate']?.currentValue : null;
    }

    if(this.startDate && this.endDate) {
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();
      const now = new Date().getTime();
      this.remainingTime = null;
      
      if (now > startDateTime && endDateTime > now) {
        this.updateTimer(); // Initial call to display the remaining time immediately.
        
        // Update the timer every second
        const timerInterval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      }
    }
  }

  private updateTimer() {
    if(this.startDate && this.endDate) {
      // Input dates and times (Change these to your desired input dates and times)
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();
      const now = new Date().getTime();

      let targetDate = endDateTime; // Assume the target date is the end date

      if (now < startDateTime) {
        // Sale has not started yet, so the target date is the start date
        targetDate = startDateTime;
      } else if (now >= endDateTime) {
        // Sale has ended, set remaining time to zero
        this.remainingTime = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        return;
      }

      this.calculateTimeDifference(targetDate);
    }
  }

  private calculateTimeDifference(targetDate: number) {
    const now = new Date().getTime();
    const timeDiff = targetDate - now;

    this.remainingTime = {
      days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
    };

  }

  ngDestroy() {
    this.startDate = null;
    this.endDate = null;
  }

}
