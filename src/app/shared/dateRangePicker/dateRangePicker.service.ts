import { Injectable } from '@angular/core'
import * as moment from 'moment';


@Injectable()

export class DateRangePickerService{

    settings = {
		"checkin" : {"min": 0 ,"max":15},
		"stay" : {"min": 1 ,"max":12}
	};

    today = moment().startOf('day').toDate();
	firstAvailDay = moment(this.today).add('days', this.settings.checkin.min).toDate();
	lastActiveDay = moment(this.firstAvailDay).add('days', this.settings.checkin.max).toDate();
	lastAvailDay = moment(this.lastActiveDay).add('days', this.settings.stay.max).toDate();

    getWeekNo = function(day) {
		return moment(day).isoWeek();
	};

    getWeek = function(day) {

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

    getWeeks = function(day) {

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

	weekLabel = function(week) {
		var firstDay = week.week[0].date;
		return moment(firstDay).format("MMM YYYY");
	};

	isDayActive = function(day,bookObj) {
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

	isCheckin = function(day,bookObj) {
		if(!bookObj.checkin) return false;
		return (moment(day.date).diff(moment(bookObj.checkin),'days') === 0);
	};

	isCheckout = function(day,bookObj) {
		if(!bookObj.checkout) return false;
		return (moment(day.date).diff(moment(bookObj.checkout),'days') === 0);
	};

	isBetween = function(day,bookObj) {
		if(!bookObj.checkin && !bookObj.checkout) return false;
		return (moment(day.date) > moment(bookObj.checkin)  && moment(day.date) < moment(bookObj.checkout));
	};

	formatDate = function(date) {
		if (!date) return '';

		return moment(date).format("ddd, D MMM");
	};

}


