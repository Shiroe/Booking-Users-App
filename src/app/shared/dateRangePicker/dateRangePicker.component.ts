import * as moment from 'moment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DateRangePickerService } from './dateRangePicker.service'

@Component({
    selector: 'ab-dateRange',
    templateUrl: './dateRangePicker.component.html',
    providers: [DateRangePickerService]
})

export class DateRangePickerComponent implements OnInit {

    @Input() bookingObj;
    @Output() checkoutChanged = new EventEmitter;

    days;
	weekLabels;
    openClendar;
    setCheckout;
    startOfWeek;
	checkinFormated;
	checkoutFormated;
	settings = {
		"checkin" : {"min": 0 ,"max":15},
		"stay" : {"min": 1 ,"max":12}
	};
	today;
	firstAvailDay;
	lastActiveDay;
	lastAvailDay;
	// currentMonth;

    constructor(
        private _dateRangePickerService: DateRangePickerService
    ){

    }

    ngOnInit(){
        // this.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
		this.checkinFormated = this.formatDate(this.bookingObj.checkin);
		this.checkoutFormated = this.formatDate(this.bookingObj.checkout);


		this.today = moment().startOf('day').toDate();
		// this.currentMonth = moment().startOf('month').toDate();
		this.firstAvailDay = moment(this.today).add('days', this.settings.checkin.min).toDate();
		this.lastActiveDay = moment(this.firstAvailDay).add('days', this.settings.checkin.max).toDate();
		this.lastAvailDay = moment(this.lastActiveDay).add('days', this.settings.stay.max).toDate();

        this.days = this.getWeeks().weeks;
        this.weekLabels = this.getWeeks().labels;
        this.openClendar = false;

		console.log('chInF: ', this.checkinFormated);
		console.log('chOutF: ', this.checkoutFormated);
		console.log('today: ', this.today);
		console.log('firstAvailDay: ', this.firstAvailDay);
		console.log('lastActiveDay: ', this.lastActiveDay);
		console.log('lastAvailDay: ', this.lastAvailDay);
		console.log('days: ', this.days);
		console.log('weekLabels: ', this.weekLabels);
		
    }


	getDayClasses(day) {
		return {
			"hoverable": this.isDayActive(day, this.bookingObj) && !this.isBetween(day, this.bookingObj),
			"unavailable": !this.isDayActive(day,this.bookingObj),
			"selected selected-from": this.isCheckin(day,this.bookingObj),
			"in-between": this.isBetween(day,this.bookingObj),
			"selected selected-to": this.isCheckout(day,this.bookingObj),
		};
	};

	selectDate(day) {
		var setcheckout = this.setCheckout;
		this.setCheckout = false;
        this.checkoutChanged.emit({
            value: setcheckout
        })
		// bookingService.selectDate(day, setcheckout); export date changed
		if (this.bookingObj.checkin &&  this.bookingObj.checkout) {
			this.checkinFormated = this.formatDate(this.bookingObj.checkin);
			this.checkoutFormated = this.formatDate(this.bookingObj.checkout);
			this.openClendar = false;
		}
	};

    getWeekNo = function(day) {
		return moment(day).isoWeek();
	};

    getWeek(day) {

		// if day is null then day = today
		if (day === undefined || day === null) day = moment(this.today);

		// check if day == int
		if (day === parseInt(day, 10)) {
			// so day becomes monday obj of that week
			day = moment().day("Monday").week(day);
		}

		// get first day of week [Monday]
		this.startOfWeek = day.startOf('isoweek').toDate();

		// init week array
		var weekArr = [];

		// start from [monday]
		for (var i = 0; i < 7; i++) {
			var newday = moment(this.startOfWeek).add(i, 'days');
			weekArr.push({
				"date": newday.toDate(),
				"dateNum":  newday.format('D'),
				"active": newday >= moment(this.firstAvailDay) && newday < moment(this.lastActiveDay),
				"future": newday >= moment(this.lastActiveDay) && newday < moment(this.lastAvailDay)
			});
		}
		return {
			week: weekArr,
			weekNum: this.getWeekNo(this.startOfWeek)
		};
	};

    getWeeks(day?) {

		// get first week
		var firstWeek = this.getWeek(day);
		var weekno = firstWeek.weekNum;


		// init weeks array
		var weeksArr = {
			weeks: firstWeek.week,
			labels:[{"label": this.weekLabel(firstWeek), "weekNum":firstWeek.weekNum}]
		};

		// never return over 52 weeks
		for (var i = 1; i < 52; i++) {

			var nextWeek = this.getWeek(weekno+i);
			var firstDay = nextWeek.week[0];
			var lastDay = nextWeek.week[nextWeek.week.length-1];

			// should we need this week?
			if (firstDay.active || firstDay.future) {
				weeksArr.weeks = weeksArr.weeks.concat(nextWeek.week);
				weeksArr.labels.push({"label": this.weekLabel(nextWeek), "weekNum":nextWeek.weekNum});
			}
			// is the end of the week meeningfull?
			if (!lastDay.active && !lastDay.future) {
				// ok, just escape the for loop
				break;
			}
		}
		return weeksArr;
	};

	weekLabel(week) {
		var firstDay = week.week[0].date;
		return moment(firstDay).format("MMM YYYY");
	};

	isDayActive(day,bookObj) {
		if (day.active) return true; // no need to check man

		// if day is future, we have checkin but no checkout date (we may give a chance)
		if (day.future && bookObj.checkin && !bookObj.checkout) {
			// only if this day is between checkin and maximum available stay
			return (moment(day.date) < moment(bookObj.checkin).add('days', this.settings.stay.max));
		}

		// if day is future, and before checkout
		if (day.future && bookObj.checkin && bookObj.checkout) {
			// only if this day is between checkin and maximum available stay
			return (moment(day.date) <= moment(bookObj.checkout));
		}

		return false;
	};

	isCheckin(day,bookObj) {
		if(!bookObj.checkin) return false;
		return (moment(day.date).diff(moment(bookObj.checkin),'days') === 0);
	};

	isCheckout(day,bookObj) {
		if(!bookObj.checkout) return false;
		return (moment(day.date).diff(moment(bookObj.checkout),'days') === 0);
	};

	isBetween(day,bookObj) {
		if(!bookObj.checkin && !bookObj.checkout) return false;
		return (moment(day.date) > moment(bookObj.checkin)  && moment(day.date) < moment(bookObj.checkout));
	};

	formatDate(date) {
		if (!date) return '';

		return moment(date).format("ddd, D MMM");
	};
}