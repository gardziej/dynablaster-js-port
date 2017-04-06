define([], function(){

	var myHelper = {

		clearNegativeZero : function(x) {
			if (x == 0 && !Math.sign(x)) x = 0;
			return x;
		},

		getRandomBin : function() {
			if (Math.random() > .5) return 1;
			return -1;
		},

		getRandomInt : function (min, max) {
			if (typeof min === 'undefined') min = 0;
			if (typeof max === 'undefined') max = 100;
			var wynik = Math.floor(Math.random() * (max - min + 1)) + min;
			return wynik;
		},

		shuffleArray : function (o)
		{
			for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		},

		pickRandomProperty : function (obj)
		{
		    var result;
		    var count = 0;
		    for (var prop in obj)
		      if (Math.random() < 1/++count)
		         result = prop;
		    return result;
		},

		distanceBetweenPoints : function (p1, p2)
		{
			var dist, dx, dy;
			dx = p1.x - p2.x;
			dy = p1.y - p2.y;
			dist = Math.sqrt(dx*dx + dy*dy);
			return dist;
		},

		deg2rad : function(degrees)
		{
			return degrees * Math.PI / 180;
		},

		rad2deg : function(radians)
		{
			return radians * 180 / Math.PI;
		}

	}

	return myHelper;
});
