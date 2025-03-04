(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.bearx = {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	var alignableInterfaceTag = 'alignable';
	class alignkit {
	    constructor(from, dir, distance) {
	        this.dir = null;
	        this.distance = Number.MAX_VALUE;
	        this.depends = new Array();
	        this.from = from.clone();
	        this.to = from.clone();
	        this.dir = (dir) ? dir.normal() : null;
	        this.distance = distance;
	    }
	    process_edge(v, w) {
	        var matched = false;
	        return matched;
	    }
	    process_node(v) {
	        var matched = false;
	        return matched;
	    }
	}

	class lstool {
	    static listnumberfix(src, value) {
	        var i;
	        for (i = 0; i < src.length; i++) {
	            if (isFinite(src[i]))
	                continue;
	            src[i] = value;
	        }
	    }
	    static disorder(src) {
	        var res = src.concat();
	        var i;
	        var len = res.length;
	        for (i = 0; i < res.length - 1; i++) {
	            var pick = Math.floor(Math.random() * len);
	            var swap = res[len - 1];
	            res[len - 1] = res[pick];
	            res[pick] = swap;
	            len--;
	        }
	        return res;
	    }
	    static listcontain_any(a, b) {
	        var i, j;
	        var found = false;
	        for (i = 0; i < b.length; i++) {
	            var v = b[i];
	            for (j = 0; j < a.length; j++) {
	                if (v != a[j])
	                    continue;
	                found = true;
	                break;
	            }
	            if (found)
	                break;
	        }
	        return found;
	    }
	    static listcontain(a, b) {
	        var i, j;
	        for (i = 0; i < b.length; i++) {
	            var v = b[i];
	            var found = false;
	            for (j = 0; j < a.length; j++) {
	                if (v != a[j])
	                    continue;
	                found = true;
	                break;
	            }
	            if (found)
	                continue;
	            return false;
	        }
	        return true;
	    }
	    static equals(a, b) {
	        var i, j;
	        for (i = 0; i < b.length; i++) {
	            var v = b[i];
	            var found = false;
	            for (j = 0; j < a.length; j++) {
	                if (v != a[j])
	                    continue;
	                found = true;
	                break;
	            }
	            if (found)
	                continue;
	            return false;
	        }
	        return a.length == b.length;
	    }
	    static simplify(src) {
	        var res = [];
	        var i, j;
	        for (i = 0; i < src.length; i++) {
	            var v = src[i];
	            var good = true;
	            for (j = i + 1; j < src.length; j++) {
	                if (v != src[j])
	                    continue;
	                good = false;
	                break;
	            }
	            if (!good)
	                continue;
	            res.push(v);
	        }
	        return res;
	    }
	    static fragment(src, a, b) {
	        var res = [];
	        for (var i = a; i < b; i++) {
	            res.push(src[i]);
	        }
	        return res;
	    }
	    static fragment_reverse(src, a, b) {
	        var frag = lstool.fragment(src, a, b);
	        frag.reverse();
	        var res = src.concat();
	        var i;
	        for (i = 0; i < b - a; i++) {
	            res[i + a] = frag[i];
	        }
	        return res;
	    }
	    static clear(lst) {
	        lst.length = 0;
	    }
	    static copyrange(src, dst, srci, dsti, len) {
	        for (var i = 0; i < len; i++) {
	            dst[i + dsti] = src[srci + i];
	        }
	    }
	    static last(lst) {
	        return lst[lst.length - 1];
	    }
	    static at(lst, order) {
	        var index = lstool.calculateindex(lst, order);
	        if (index < 0)
	            return null;
	        return lst[index];
	    }
	    static set(lst, order, value) {
	        var index = lstool.calculateindex(lst, order);
	        if (index < 0)
	            return null;
	        lst[index] = value;
	    }
	    static calculateindex(lst, order) {
	        if (lst.length == 0)
	            return -1;
	        order += Math.ceil(Math.abs(order) / lst.length) * lst.length;
	        return order % lst.length;
	    }
	    static invert(src) {
	        return src.concat().reverse();
	    }
	    static range(src, start, end) {
	        var res = [];
	        for (var i = start; i < end; i++) {
	            res.push(src[i]);
	        }
	        return res;
	    }
	    static remove_null(src) {
	        for (var i = 0; i < src.length; i++) {
	            if (src[i] != null)
	                continue;
	            src.splice(i--, 1);
	        }
	    }
	    static remove_item(lst, value) {
	        for (var i = 0; i < lst.length; i++) {
	            if (lst[i] == value) {
	                lst.splice(i, 1);
	                break;
	            }
	        }
	    }
	    static remove_item_orderless(lst, value) {
	        for (var i = 0; i < lst.length; i++) {
	            if (lst[i] == value) {
	                lst[i] = lst[lst.length - 1];
	                lst.pop();
	                break;
	            }
	        }
	    }
	    static swap(lst, i, j) {
	        var temp = lst[i];
	        lst[i] = lst[j];
	        lst[j] = temp;
	    }
	    static contain(lst, value) {
	        for (var i = 0; i < lst.length; i++) {
	            if (lst[i] == value) {
	                return i;
	            }
	        }
	        return -1;
	    }
	    static attach(dst, src) {
	        for (var i = 0; i < src.length; i++) {
	            dst.push(src[i]);
	        }
	    }
	    static attachrange(dst, src, a, b) {
	        for (var i = a; i < b; i++) {
	            dst.push(src[i]);
	        }
	    }
	    static clone(dst, src) {
	        var i;
	        for (i = 0; i < src.length; i++) {
	            dst.push(src[i].clone());
	        }
	    }
	    static fill(dst, element, count, useclone = false) {
	        var i;
	        if (useclone)
	            for (i = dst.length; i < count; i++) {
	                dst.push(element.clone());
	            }
	        else
	            for (i = dst.length; i < count; i++) {
	                dst.push(element);
	            }
	    }
	    static init(dst, element, count, useclone = false) {
	        dst.length = 0;
	        var i;
	        if (useclone)
	            for (i = 0; i < count; i++) {
	                dst.push(element.clone());
	            }
	        else
	            for (i = 0; i < count; i++) {
	                dst.push(element);
	            }
	    }
	    static sortindices(numlst) {
	        if (numlst.length == 0)
	            return [];
	        var i;
	        var mapping = new Array();
	        for (i = 0; i < numlst.length; i++) {
	            mapping.push(i);
	        }
	        var enumquene = new Array();
	        enumquene.push(0, numlst.length);
	        for (i = 0; i < enumquene.length; i += 2) {
	            lstool._sortindices_enumerate(numlst, mapping, enumquene[i], enumquene[i + 1], enumquene);
	        }
	        return mapping;
	    }
	    static _sortindices_enumerate(numlst, mapping, a, b, enumquene) {
	        var index = Math.floor((b - a) * Math.random() + a);
	        var cursor = numlst[mapping[index]];
	        var node;
	        var seperator;
	        var i;
	        var j;
	        var swaper;
	        i = a;
	        j = b - 1;
	        seperator = i + 1;
	        while (true) {
	            for (; i < b; i++) {
	                node = numlst[mapping[i]];
	                if (node >= cursor) {
	                    break;
	                }
	            }
	            for (; j >= a; j--) {
	                node = numlst[mapping[j]];
	                if (node <= cursor) {
	                    break;
	                }
	            }
	            if (j <= i) {
	                seperator = i;
	                break;
	            }
	            swaper = mapping[i];
	            mapping[i] = mapping[j];
	            mapping[j] = swaper;
	            i++;
	            j--;
	        }
	        if (seperator - a > 1)
	            enumquene.push(a, seperator);
	        if (b - seperator > 1)
	            enumquene.push(seperator, b);
	    }
	    static sort(numlst) {
	        if (numlst.length == 0)
	            return;
	        var mapping = new Array();
	        for (var i = 0; i < numlst.length; i++) {
	            mapping.push(i);
	        }
	        var enumquene = new Array();
	        enumquene.push(0, numlst.length);
	        for (i = 0; i < enumquene.length; i += 2) {
	            lstool._sort_enumerate(numlst, mapping, enumquene[i], enumquene[i + 1], enumquene);
	        }
	    }
	    static _sort_enumerate(numlst, mapping, a, b, enumquene) {
	        var index = Math.floor((b - a) * Math.random() + a);
	        var cursor = numlst[index];
	        var node;
	        var seperator;
	        var i;
	        var j;
	        i = a;
	        j = b - 1;
	        seperator = i + 1;
	        while (true) {
	            for (; i < b; i++) {
	                node = numlst[i];
	                if (node >= cursor) {
	                    break;
	                }
	            }
	            for (; j >= a; j--) {
	                node = numlst[j];
	                if (node <= cursor) {
	                    break;
	                }
	            }
	            if (j <= i) {
	                seperator = i;
	                break;
	            }
	            node = numlst[i];
	            numlst[i] = numlst[j];
	            numlst[j] = node;
	            i++;
	            j--;
	        }
	        if (seperator - a > 1)
	            enumquene.push(a, seperator);
	        if (b - seperator > 1)
	            enumquene.push(seperator, b);
	    }
	}

	class float3 {
	    constructor(x = 0, y = 0, z = 0) {
	        this.x = 0;
	        this.y = 0;
	        this.z = 0;
	        this.x = x;
	        this.y = y;
	        this.z = z;
	    }
	    static linspace(a, b, count = 1) {
	        var res = [];
	        var i;
	        var base = count + 1;
	        res.push(a);
	        for (i = 0; i < count; i++) {
	            res.push(float3.lerp(a, b, (i + 1) / base));
	        }
	        res.push(b);
	        return res;
	    }
	    static vectorsnormal(a, b, c) {
	        return b.sub(a).crossnormalize(c.sub(b));
	    }
	    static lerp(a, b, factor = 0.5) {
	        return b.sub(a).scale(factor).add(a);
	    }
	    static dir(a, b) {
	        return b.sub(a).normal();
	    }
	    static dirf(a, b) {
	        return b.sub(a).normalf();
	    }
	    static lineCord(a, b, position) {
	        var p = position;
	        var ab = b.sub(a);
	        var lab = ab.length;
	        var scale = p.sub(a).dot(ab) / lab / lab;
	        return scale;
	    }
	    static ListPathToLoop(path) {
	        var res = path.concat();
	        res.pop();
	        return res;
	    }
	    static ListCenter(ves) {
	        var sum = new float3();
	        for (var i = 0; i < ves.length; i++) {
	            sum.addby(ves[i]);
	        }
	        return sum.scale(1 / ves.length);
	    }
	    static remove_last_if_loop(ves) {
	        if (!ves[0].equals(lstool.last(ves)))
	            return ves;
	        ves.pop();
	        return ves;
	    }
	    static ListClone(value) {
	        var i;
	        var res = new Array();
	        for (i = 0; i < value.length; i++) {
	            res.push(value[i].clone());
	        }
	        return res;
	    }
	    static ListMatrix(value, matrix) {
	        var i;
	        for (i = 0; i < value.length; i++) {
	            value[i] = matrix.mulvector(value[i]);
	        }
	        return value;
	    }
	    static ListScale(value, scale, center = new float3()) {
	        var i;
	        var res = new Array();
	        if (scale instanceof float3) {
	            for (i = 0; i < value.length; i++) {
	                var v = value[i].sub(center);
	                var sv = new float3(v.x * scale.x, v.y * scale.y, v.z * scale.z).add(center);
	                res.push(sv);
	            }
	        }
	        else if (isFinite(scale)) {
	            for (i = 0; i < value.length; i++) {
	                res.push(value[i].sub(center).scale(scale).add(center));
	            }
	        }
	        return res;
	    }
	    static ListAdd(value, v) {
	        var i;
	        var res = new Array();
	        for (i = 0; i < value.length; i++) {
	            res.push(value[i].add(v));
	        }
	        return res;
	    }
	    static ListToString(value, p = 4) {
	        var res = "[";
	        var v;
	        var i;
	        if (value.length > 0) {
	            if (p > 0) {
	                for (i = 0; i < value.length - 1; i++) {
	                    v = value[i];
	                    res += Number(v.x.toPrecision(p)) + "," + Number(v.y.toPrecision(p)) + "," + Number(v.z.toPrecision(p)) + ",";
	                }
	                v = value[value.length - 1];
	                res += Number(v.x.toPrecision(p)) + "," + Number(v.y.toPrecision(p)) + "," + Number(v.z.toPrecision(p));
	            }
	            else {
	                for (i = 0; i < value.length - 1; i++) {
	                    v = value[i];
	                    res += v.x + "," + v.y + "," + v.z + ",";
	                }
	                v = value[value.length - 1];
	                res += v.x + "," + v.y + "," + v.z;
	            }
	        }
	        res += "]";
	        return res;
	    }
	    static fromNumberList(value) {
	        var i;
	        var res = new Array();
	        for (i = 0; i < value.length - 2; i += 3) {
	            res.push(new float3(value[i + 0], value[i + 1], value[i + 2]));
	        }
	        return res;
	    }
	    static fromStringList(value) {
	        var i;
	        var j;
	        var k;
	        i = value.indexOf("[") + 1;
	        k = value.indexOf("]");
	        var res = new Array();
	        while (i < k) {
	            var v = new float3();
	            j = value.indexOf(",", i);
	            v.x = Number(value.substring(i, j));
	            i = j + 1;
	            j = value.indexOf(",", i);
	            v.y = Number(value.substring(i, j));
	            i = j + 1;
	            j = value.indexOf(",", i);
	            if (j < 0) {
	                j = k;
	            }
	            v.z = Number(value.substring(i, j));
	            i = j + 1;
	            res.push(v);
	        }
	        return res;
	    }
	    ceil() {
	        return new float3(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
	    }
	    round() {
	        return new float3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
	    }
	    static add(a, b) {
	        return new float3(a.x + b.x, a.y + b.y, a.z + b.z);
	    }
	    static sub(a, b) {
	        return new float3(a.x - b.x, a.y - b.y, a.z - b.z);
	    }
	    static X() {
	        return new float3(1, 0, 0);
	    }
	    static Y() {
	        return new float3(0, 1, 0);
	    }
	    static Z() {
	        return new float3(0, 0, 1);
	    }
	    equals(value) {
	        return this.sub(value).lengthSq == 0;
	    }
	    nearequals(value, range) {
	        return this.sub(value).lengthSq < range * range;
	    }
	    toString() {
	        return "float3(" + this.x + "," + this.y + "," + this.z + ")";
	    }
	    toPreciseString(p = 4) {
	        return "float3(" + this.x.toFixed(p) + "," + this.y.toFixed(p) + "," + this.z.toFixed(p) + ")";
	    }
	    static fromString(string) {
	        var i;
	        var j;
	        var v = new float3();
	        i = string.indexOf("(") + 1;
	        j = string.indexOf(",", i);
	        v.x = Number(string.substring(i, j));
	        i = j + 1;
	        j = string.indexOf(",", i);
	        v.y = Number(string.substring(i, j));
	        i = j + 1;
	        j = string.indexOf(")", i);
	        v.z = Number(string.substring(i, j));
	        return v;
	    }
	    dot(value) {
	        return this.x * value.x + this.y * value.y + this.z * value.z;
	    }
	    absdot(value) {
	        return Math.abs(this.x * value.x + this.y * value.y + this.z * value.z);
	    }
	    cross(value) {
	        return new float3(this.y * value.z - this.z * value.y, this.z * value.x - this.x * value.z, this.x * value.y - this.y * value.x);
	    }
	    crossnormalize(value) {
	        var ans = new float3(this.y * value.z - this.z * value.y, this.z * value.x - this.x * value.z, this.x * value.y - this.y * value.x);
	        var len = ans.length;
	        if (len == 0)
	            return new float3();
	        var invlen = 1 / len;
	        ans.x *= invlen;
	        ans.y *= invlen;
	        ans.z *= invlen;
	        return ans;
	    }
	    add(value) {
	        return new float3(this.x + value.x, this.y + value.y, this.z + value.z);
	    }
	    advance(dir, distance) {
	        return new float3(this.x + dir.x * distance, this.y + dir.y * distance, this.z + dir.z * distance);
	    }
	    addby(value) {
	        this.x += value.x;
	        this.y += value.y;
	        this.z += value.z;
	    }
	    projlength(n) {
	        return Math.abs(this.dot(n));
	    }
	    sub(value) {
	        return new float3(this.x - value.x, this.y - value.y, this.z - value.z);
	    }
	    clone() {
	        return new float3(this.x, this.y, this.z);
	    }
	    fill(value) {
	        this.x = value.x;
	        this.y = value.y;
	        this.z = value.z;
	    }
	    scale(value) {
	        return new float3(this.x * value, this.y * value, this.z * value);
	    }
	    scaleBy(value) {
	        this.x *= value;
	        this.y *= value;
	        this.z *= value;
	        return this;
	    }
	    get lengthSq() {
	        return this.x * this.x + this.y * this.y + this.z * this.z;
	    }
	    get length() {
	        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	    }
	    normal() {
	        var len = this.length;
	        if (len == 0)
	            return new float3();
	        return this.scale(1 / len);
	    }
	    normalf() {
	        var sacle = 1 / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	        return new float3(this.x * sacle, this.y * sacle, this.z * sacle);
	    }
	    negate() {
	        return new float3(-this.x, -this.y, -this.z);
	    }
	    align(target, normal) {
	        return target.sub(this).proj(normal).add(this);
	    }
	    proj(normal) {
	        return normal.scale(this.dot(normal));
	    }
	    cancel(dir) {
	        return this.sub(this.proj(dir));
	    }
	}
	function f3(x = 0, y = 0, z = 0) {
	    return new float3(x, y, z);
	}
	function f3box(scale = 100, zero = 'min') {
	    var res = [];
	    var offset;
	    var raw = [f3(0, 0), f3(1, 0), f3(1, 1), f3(0, 1)];
	    switch (zero) {
	        case 'min':
	            offset = new float3();
	            break;
	        case 'center':
	            offset = new float3(-0.5, -0.5);
	            break;
	    }
	    res = float3.ListScale(float3.ListAdd(raw, offset), scale);
	    if (scale.x * scale.y < 0)
	        res = res.reverse();
	    return res;
	}

	class Ray {
	    constructor(position = null, direction = null) {
	        this.pos = new float3();
	        this.dir = new float3();
	        if (position != null)
	            this.pos = position;
	        if (direction != null)
	            this.dir = direction;
	    }
	    dot(v) {
	        return v.sub(this.pos).dot(this.dir);
	    }
	    clone() {
	        return new Ray(this.pos.clone(), this.dir.clone());
	    }
	    negate() {
	        return new Ray(this.pos.clone(), this.dir.negate());
	    }
	    toString() {
	        return "Ray(" + this.pos.x + "," + this.pos.y + "," + this.pos.z + "," + this.dir.x + "," + this.dir.y + "," + this.dir.z + ")";
	    }
	    static fromString(value) {
	        var i;
	        var j;
	        var r = new Ray();
	        i = value.indexOf("(") + 1;
	        j = value.indexOf(")", i);
	        var list = value.substring(i, j).split(',');
	        r.pos = new float3(Number(list[0]), Number(list[1]), Number(list[2]));
	        r.dir = new float3(Number(list[3]), Number(list[4]), Number(list[5]));
	        return r;
	    }
	}

	let CalcConst = /** @class */ (() => {
	    class CalcConst {
	    }
	    CalcConst.RADIANS_TO_DEGREES = 180 / Math.PI;
	    CalcConst.DEGREES_TO_RADIANS = Math.PI / 180;
	    CalcConst.nearzero = 0.000001;
	    CalcConst.unit = 0.01;
	    CalcConst.min_curve_node_dis = 0.1;
	    CalcConst.dis_err = 0.0001;
	    CalcConst.dissq_err = CalcConst.dis_err * CalcConst.dis_err;
	    CalcConst.dot_err = 1 - Math.cos(0.5 * CalcConst.DEGREES_TO_RADIANS);
	    CalcConst.precision = 6;
	    return CalcConst;
	})();

	class MathCalc {
	    static dampingmotion(source, target, dampimg) {
	        dampimg = MathCalc.Clamp(dampimg, 0, 1);
	        var res = (target - source) * dampimg + source;
	        if (Math.abs(res - target) < CalcConst.dis_err)
	            res = target;
	        return res;
	    }
	    static randomrange(a, b) {
	        return Math.random() * (b - a) + a;
	    }
	    static sign(value) {
	        return value < 0 ? -1 : 1;
	    }
	    static equal(a, b, epsilon = 0.001) {
	        return Math.abs(a - b) < epsilon;
	    }
	    static Clamp(value, min = 0, max = 1) {
	        return Math.max(Math.min(value, max), min);
	    }
	    static compare(a, b, epsilon = 0.001) {
	        var v = a - b;
	        if (v < -epsilon) {
	            return -1;
	        }
	        else if (v > +epsilon) {
	            return +1;
	        }
	        return 0;
	    }
	    static Lerp(from, to, value) {
	        return from + (to - from) * value;
	    }
	    static frac(value) {
	        return value - Math.floor(value);
	    }
	    static betweenEqual(value, min, max) {
	        return value >= min && value <= max;
	    }
	    static between(value, min, max) {
	        return value > min && value < max;
	    }
	    static toPrecision(value, precision) {
	        return Number(value.toPrecision(precision));
	    }
	    static bitcount(bits) {
	        //01010101010101010101010101010101
	        //00110011001100110011001100110011
	        //00000111000001110000011100000111
	        //00000000000011110000000000001111
	        //00000000000000000000000000011111
	        var a = bits;
	        var b = a & 1431655765;
	        var c = a - b;
	        c = c >>> 1;
	        a = b + c;
	        b = a & 858993459;
	        c = a - b;
	        c = c >>> 2;
	        a = b + c;
	        b = a & 117901063;
	        c = a - b;
	        c = c >>> 4;
	        a = b + c;
	        b = a & 983055;
	        c = a - b;
	        c = c >>> 8;
	        a = b + c;
	        b = a & 31;
	        c = a - b;
	        c = c >>> 16;
	        a = b + c;
	        return a;
	    }
	}

	class VectorCalc {
	    static reflection(a, n) {
	        return a.sub(a.proj(n).scale(2));
	    }
	    static LineCrossLine(p0, p1, q0, q1) {
	        var v0 = p1.sub(p0);
	        var dir0 = v0.normal();
	        var dir1 = q1.sub(q0);
	        var up = dir1.crossnormalize(dir0);
	        var diff = q0.sub(p0);
	        if (Math.abs(diff.dot(up)) > CalcConst.dis_err)
	            return null; //异面
	        var n1t = dir1.crossnormalize(up);
	        var base = dir0.dot(n1t);
	        if (Math.abs(base) < CalcConst.nearzero)
	            return null; // 同面平衡
	        var plen = diff.dot(n1t) / base;
	        var hit = p0.advance(dir0, plen);
	        var n1 = dir1.normal();
	        return hit;
	    }
	    static SegmentCrossSegment(p0, p1, q0, q1, tolerance = +CalcConst.dis_err) {
	        var v0 = p1.sub(p0);
	        var dir0 = v0.normal();
	        var v1 = q1.sub(q0);
	        var dir1 = v1.normal();
	        var up = dir1.cross(dir0);
	        var diff = q0.sub(p0);
	        if (Math.abs(diff.dot(up)) > CalcConst.dis_err)
	            return null; //异面
	        var dir1t = dir1.cross(up);
	        var base = dir0.dot(dir1t);
	        if (Math.abs(base) < CalcConst.nearzero)
	            return null; // 同面平衡
	        var plen = diff.dot(dir1t) / base;
	        if (plen < 0 - tolerance || plen > v0.dot(dir0) + tolerance) {
	            return null;
	        }
	        var hit = p0.advance(dir0, plen);
	        var qlen = hit.sub(q0).dot(dir1);
	        if (qlen < -tolerance || qlen > v1.dot(dir1) + tolerance)
	            return null;
	        return hit;
	    }
	    static segmentCrossPlane(linePos0, linePos1, planePos, planeNormal, epsilon = 0.0001) {
	        var Nab = linePos1.sub(linePos0);
	        var Lab = Nab.length;
	        Nab.scaleBy(1 / Lab);
	        var d_n_nab = Nab.dot(planeNormal);
	        if (Math.abs(d_n_nab) < CalcConst.nearzero)
	            return null;
	        var xLen = planePos.sub(linePos0).dot(planeNormal) / d_n_nab;
	        if (xLen < -epsilon || xLen > Lab + epsilon)
	            return null;
	        return linePos0.advance(Nab, xLen);
	    }
	    /**
	     * eular angle between two vectors.
	     *
	     * @param na
	     * @param nb
	     * @param up  make sure that na.up = 0   nb.up = 0,ortherwise will not work.
	     */ static angle(na, nb, up) {
	        var cosX = na.dot(nb);
	        var up1 = na.cross(nb);
	        var sign = MathCalc.sign(up1.dot(up));
	        if (cosX > 1) {
	            cosX = 1;
	        }
	        else if (cosX < -1) {
	            cosX = -1;
	        }
	        var x = Math.acos(cosX) * sign;
	        return x;
	    }
	    static segmentContainPointF(a, b, point, range = 0.001) {
	        var nab = b.sub(a).normal();
	        var ap = point.sub(a);
	        var bp = point.sub(b);
	        var out = nab.cross(ap).cross(nab).normal();
	        if (Math.abs(out.dot(ap)) > range
	            ||
	                ap.dot(nab) < -range
	            ||
	                bp.dot(nab) > +range)
	            return false;
	        return true;
	    }
	    static segmentContainPoint(a, b, point, range = 0.001) {
	        if (a.nearequals(point, range) || b.nearequals(point, range))
	            return 2;
	        var nab = b.sub(a).normal();
	        var ap = point.sub(a);
	        var bp = point.sub(b);
	        var out = nab.cross(ap).cross(nab).normal();
	        if (Math.abs(out.dot(ap)) > range
	            ||
	                ap.dot(nab) < 0
	            ||
	                bp.dot(nab) > 0)
	            return 0;
	        return 1;
	    }
	    static dotLineDistance(a, b, point) {
	        var ab = b.sub(a);
	        var ap = point.sub(a);
	        var out = ab.cross(ap).cross(ab);
	        if (out.lengthSq > CalcConst.nearzero) {
	            out = out.normal();
	        }
	        else {
	            out = new float3();
	        }
	        return Math.abs(out.dot(ap));
	    }
	    static raySegmentDistance(ray, s0, s1) {
	        var sdir = s1.sub(s0);
	        var n = ray.dir.cross(sdir).cross(sdir);
	        if (n.lengthSq < CalcConst.dis_err)
	            return Number.MAX_VALUE;
	        n = n.normal();
	        var hit = VectorCalc.rayCrossPlane(ray, s0, n);
	        if (hit == null)
	            return Number.MAX_VALUE;
	        return VectorCalc.dotSegmentDistance(hit, s0, s1);
	    }
	    static dotSegmentDistance(point, s0, s1) {
	        var sdir = s1.sub(s0);
	        var spdir = point.sub(s0);
	        if (spdir.dot(sdir) <= 0) {
	            return spdir.length;
	        }
	        if (point.sub(s1).dot(sdir) > 0) {
	            return point.sub(s1).length;
	        }
	        {
	            var sR = sdir.cross(spdir).cross(sdir);
	            if (sR.lengthSq > CalcConst.nearzero) {
	                sR = sR.normal();
	            }
	            else {
	                sR = new float3();
	            }
	            return Math.abs(sR.dot(spdir));
	        }
	    }
	    static dotRayDistance(ray, point) {
	        var ap = point.sub(ray.pos);
	        var out = ray.dir.cross(ap).cross(ray.dir);
	        if (out.lengthSq > CalcConst.nearzero) {
	            out = out.normal();
	        }
	        else {
	            out = new float3();
	        }
	        return Math.abs(out.dot(ap));
	    }
	    static rayCrossPlane(ray, planePos, planeNormal, pos_error = 0.0001, allowNagivate = false) {
	        var Nab = ray.dir;
	        var d_n_nab = Nab.dot(planeNormal);
	        if (d_n_nab == 0)
	            return null;
	        var xLen = planePos.sub(ray.pos).dot(planeNormal) / d_n_nab;
	        if (!allowNagivate && xLen < -pos_error)
	            return null;
	        return ray.pos.add(Nab.scale(xLen));
	    }
	    static rayCrossRay(ray0, ray1, epsilon = 0.0001) {
	        //|nAB| /  nAB.b =  |AB| . |BO|
	        var AB = ray1.pos.sub(ray0.pos);
	        var normal = ray0.dir.cross(ray1.dir).normal();
	        if (Math.abs(AB.dot(normal)) > epsilon)
	            return null; //异面
	        if (Math.abs(ray0.dir.dot(ray1.dir)) > 1 - CalcConst.nearzero)
	            return null; // 同面平衡
	        var r1t = ray1.dir.cross(normal);
	        var BO = r1t.dot(AB) / ray0.dir.dot(r1t);
	        return ray0.pos.add(ray0.dir.scale(BO));
	    }
	    static rayCrossLine(ray, p0, p1, epsilon = 0.0001) {
	        var dir0 = ray.dir;
	        var dir1 = p1.sub(p0);
	        var up = dir0.cross(dir1).normal();
	        var diff = ray.pos.sub(p0);
	        if (Math.abs(diff.dot(up)) > epsilon)
	            return null; //异面
	        var n1t = dir0.cross(up).normal();
	        var base = dir1.dot(n1t);
	        if (Math.abs(base) < CalcConst.nearzero)
	            return null; // 同面平衡
	        var scale = diff.dot(n1t) / base;
	        var r = float3.lerp(p0, p1, scale);
	        var length1 = r.sub(ray.pos).dot(ray.dir);
	        if (length1 < -epsilon)
	            return null; //负方向
	        return r;
	    }
	    static rayCrossSegment(p, q0, q1, distance_error = 0.0001, allowNagivate = false) {
	        var v1 = q1.sub(q0);
	        var dir0 = p.dir;
	        var dir1 = v1.normal();
	        var up = dir0.cross(dir1).normal();
	        var diff = p.pos.sub(q0);
	        if (Math.abs(diff.dot(up)) > distance_error)
	            return null; //异面
	        var n1t = dir0.cross(up).normal();
	        var base = dir1.dot(n1t);
	        if (Math.abs(base) < CalcConst.nearzero)
	            return null; // 同面平衡
	        var length = diff.dot(n1t) / base;
	        if (length < 0 - distance_error || length > dir1.dot(v1) + distance_error) {
	            return null;
	        }
	        var r = q0.advance(dir1, length);
	        var length1 = r.sub(p.pos).dot(p.dir);
	        if (!allowNagivate && length1 < -CalcConst.nearzero)
	            return null; //负方向
	        return r;
	    }
	}

	class tensor3 {
	    constructor() {
	        this.el = new Array();
	        this.el.length = 9;
	        this.el[0] = 1;
	        this.el[1] = 0;
	        this.el[2] = 0;
	        this.el[3] = 0;
	        this.el[4] = 1;
	        this.el[5] = 0;
	        this.el[6] = 0;
	        this.el[7] = 0;
	        this.el[8] = 1;
	    }
	    get_axis(row) {
	        return new float3(this.el[0 * 3 + row], this.el[1 * 3 + row], this.el[2 * 3 + row]);
	    }
	    set_axis(row, value) {
	        this.el[0 * 3 + row] = value.x;
	        this.el[1 * 3 + row] = value.y;
	        this.el[2 * 3 + row] = value.z;
	    }
	    static fromToMatrix(a, b) {
	        return a.invert().mulmatrix(b);
	    }
	    static eular(value) {
	        var ans = new tensor3();
	        ans.rotateX(value.x);
	        ans.rotateY(value.y);
	        ans.rotateZ(value.z);
	        return ans;
	    }
	    rotateX(eular) {
	        this.rotate(eular, new float3(1, 0, 0));
	    }
	    rotateY(eular) {
	        this.rotate(eular, new float3(0, 1, 0));
	    }
	    rotateZ(eular) {
	        this.rotate(eular, new float3(0, 0, 1));
	    }
	    scale(value) {
	        this.el[0] *= value.x;
	        this.el[4] *= value.y;
	        this.el[8] *= value.z;
	    }
	    static createByAxisYZ(ny, nz) {
	        var nx = ny.cross(nz);
	        var value = new tensor3();
	        value.set_axis(0, nx);
	        value.set_axis(1, ny);
	        value.set_axis(2, nz);
	        return value;
	    }
	    static indenty() {
	        var ans = new tensor3();
	        ans.el[0] = 1;
	        ans.el[1] = 0;
	        ans.el[2] = 0;
	        ans.el[3] = 0;
	        ans.el[4] = 1;
	        ans.el[5] = 0;
	        ans.el[6] = 0;
	        ans.el[7] = 0;
	        ans.el[8] = 1;
	        return ans;
	    }
	    _innermulmatrix(row, value, column) {
	        return +this.el[row * 3 + 0] * value.el[0 + column]
	            + this.el[row * 3 + 1] * value.el[3 + column]
	            + this.el[row * 3 + 2] * value.el[6 + column];
	    }
	    _innermulvector(row, value) {
	        return this.el[row * 3 + 0] * value.x + this.el[row * 3 + 1] * value.y + this.el[row * 3 + 2] * value.z;
	    }
	    mulmatrix(value) {
	        var ans = new tensor3();
	        ans.el[0] = this._innermulmatrix(0, value, 0);
	        ans.el[1] = this._innermulmatrix(0, value, 1);
	        ans.el[2] = this._innermulmatrix(0, value, 2);
	        ans.el[3] = this._innermulmatrix(1, value, 0);
	        ans.el[4] = this._innermulmatrix(1, value, 1);
	        ans.el[5] = this._innermulmatrix(1, value, 2);
	        ans.el[6] = this._innermulmatrix(2, value, 0);
	        ans.el[7] = this._innermulmatrix(2, value, 1);
	        ans.el[8] = this._innermulmatrix(2, value, 2);
	        return ans;
	    }
	    _dot3fvec(x, y, z, v) {
	        return x * v.x + y * v.y + z * v.z;
	    }
	    mulvector(value) {
	        return new float3(this._dot3fvec(this.el[0], this.el[1], this.el[2], value), this._dot3fvec(this.el[3], this.el[4], this.el[5], value), this._dot3fvec(this.el[6], this.el[7], this.el[8], value));
	    }
	    transpose() {
	        var t;
	        // 0 1 2
	        // 3 4 5
	        // 6 7 8
	        t = this.el[1];
	        this.el[1] = this.el[3];
	        this.el[3] = t;
	        t = this.el[2];
	        this.el[2] = this.el[6];
	        this.el[6] = t;
	        t = this.el[5];
	        this.el[5] = this.el[7];
	        this.el[7] = t;
	    }
	    transposed() {
	        var ans = new tensor3();
	        // 012 
	        // 345 
	        // 678 
	        ans.el[0] = this.el[0];
	        ans.el[1] = this.el[3];
	        ans.el[2] = this.el[6];
	        ans.el[3] = this.el[1];
	        ans.el[4] = this.el[4];
	        ans.el[5] = this.el[7];
	        ans.el[6] = this.el[2];
	        ans.el[7] = this.el[5];
	        ans.el[8] = this.el[8];
	        return ans;
	    }
	    invert() {
	        var Axt = new tensor3();
	        Axt.el[0] = this.resdet(0, 0);
	        Axt.el[1] = this.resdet(0, 1);
	        Axt.el[2] = this.resdet(0, 2);
	        Axt.el[3] = this.resdet(1, 0);
	        Axt.el[4] = this.resdet(1, 1);
	        Axt.el[5] = this.resdet(1, 2);
	        Axt.el[6] = this.resdet(2, 0);
	        Axt.el[7] = this.resdet(2, 1);
	        Axt.el[8] = this.resdet(2, 2);
	        var Ax;
	        Ax = Axt.transposed();
	        var invdel = 1 / this.det();
	        Ax.el[0] = Ax.el[0] * invdel;
	        Ax.el[1] = Ax.el[1] * invdel;
	        Ax.el[2] = Ax.el[2] * invdel;
	        Ax.el[3] = Ax.el[3] * invdel;
	        Ax.el[4] = Ax.el[4] * invdel;
	        Ax.el[5] = Ax.el[5] * invdel;
	        Ax.el[6] = Ax.el[6] * invdel;
	        Ax.el[7] = Ax.el[7] * invdel;
	        Ax.el[8] = Ax.el[8] * invdel;
	        return Ax;
	    }
	    clone() {
	        var ans = new tensor3();
	        // 012  036
	        // 345  147
	        // 678  258
	        ans.el[0] = this.el[0];
	        ans.el[1] = this.el[1];
	        ans.el[2] = this.el[2];
	        ans.el[3] = this.el[3];
	        ans.el[4] = this.el[4];
	        ans.el[5] = this.el[5];
	        ans.el[6] = this.el[6];
	        ans.el[7] = this.el[7];
	        ans.el[8] = this.el[8];
	        for (var i = 0; i < 9; i++) {
	            ans.el[i] = this.el[i];
	        }
	        return ans;
	    }
	    resdet(row, column) {
	        var lst = new Array();
	        for (var i = 0; i < 3; i++) {
	            for (var j = 0; j < 3; j++) {
	                if (i == row || j == column)
	                    continue;
	                lst.push(this.el[j * 3 + i]);
	            }
	        }
	        return lst[0] * lst[3] - lst[1] * lst[2];
	    }
	    det() {
	        // 11 12 13
	        // 21 22 23
	        // 31 32 33
	        //  0  1  2
	        //  3  4  5
	        //  6  7  8
	        //11*22*33 + 12*23*31 + 13*21*32 - 11*23*32 - 12*21*33 - 13*22*31
	        return + +this.el[0] * this.el[4] * this.el[8] + this.el[1] * this.el[5] * this.el[6] + this.el[2] * this.el[3] * this.el[7]
	            - this.el[0] * this.el[5] * this.el[7] - this.el[1] * this.el[3] * this.el[8] - this.el[2] * this.el[4] * this.el[6];
	    }
	    rotate(eular, axis) {
	        var sin = Math.sin(eular);
	        var cos = Math.cos(eular);
	        var v, v1, v2;
	        for (var i = 0; i < 3; i++) {
	            v = this.get_axis(i);
	            v1 = v.cancel(axis);
	            var n1 = v1.normal();
	            var n2 = axis.cross(n1).normal();
	            var len = v1.length;
	            v2 = n1.scale(cos * len).add(n2.scale(sin * len)).add(v.sub(v1));
	            this.set_axis(i, v2);
	        }
	    }
	}

	function ArcPoint3ToSegmentArray(p0, p1, p2, deltaAngle = 10 * CalcConst.DEGREES_TO_RADIANS, mindistance = 0.01, nearzero = 0.00001) {
	    var points = new Array();
	    var a = p0;
	    var b = p1;
	    var c = p2;
	    var ab_cpos = float3.lerp(a, b, 0.5);
	    var bc_cpos = float3.lerp(b, c, 0.5);
	    var ab = b.sub(a);
	    var bc = c.sub(b);
	    if (ab.cross(bc).length < nearzero) {
	        return [p0, p2];
	    }
	    var up = bc.cross(ab).normal();
	    var Rab = ab.cross(up).normal();
	    var Nbc = bc.normal();
	    var x = bc_cpos.sub(ab_cpos).dot(Nbc) / Rab.dot(Nbc);
	    /*圆心*/ var orign = ab_cpos.add(Rab.scale(x));
	    /*半径*/ var radius = b.sub(orign).length;
	    var deltaArcLen = deltaAngle / 2 * Math.PI * radius * 2; //弧长
	    if (deltaArcLen < mindistance) {
	        deltaAngle *= mindistance / deltaArcLen;
	    }
	    if (deltaAngle > Math.PI * 2 / 3) {
	        deltaAngle = Math.PI * 2 / 3;
	    }
	    var fromRot = 0;
	    var vao = a.sub(orign).normal();
	    var vbo = b.sub(orign).normal();
	    var vco = c.sub(orign).normal();
	    var toRot = VectorCalc.angle(vao, vco, up);
	    var midRot = VectorCalc.angle(vao, vbo, up);
	    var best_total_angle = Math.PI * 2;
	    var best_solu = 0;
	    var list = new Array();
	    list.push(new float3(fromRot, midRot, toRot));
	    list.push(new float3(fromRot, midRot, toRot + Math.PI * 2));
	    list.push(new float3(fromRot, midRot, toRot - Math.PI * 2));
	    list.push(new float3(fromRot, midRot - Math.PI * 2, toRot - Math.PI * 2));
	    list.push(new float3(fromRot, midRot + Math.PI * 2, toRot + Math.PI * 2));
	    for (var i = 0; i < list.length; i++) {
	        var part0 = (list[i].y - list[i].x);
	        var part1 = (list[i].z - list[i].y);
	        var score = Math.abs(part0) + Math.abs(part1);
	        if (part0 * part1 <= 0)
	            continue;
	        if (score < best_total_angle) {
	            best_total_angle = score;
	            best_solu = i;
	        }
	    }
	    fromRot = list[best_solu].x;
	    midRot = list[best_solu].y;
	    toRot = list[best_solu].z;
	    /*弧角*/ var arcAngle = toRot - fromRot;
	    var matrix = tensor3.createByAxisYZ(vao, up);
	    var hArcCount = Math.abs(Math.ceil(arcAngle / (deltaAngle)));
	    var dHAngle = arcAngle / hArcCount;
	    points.push(a);
	    for (var j = 0; j < hArcCount - 1; j++) {
	        matrix.rotate(dHAngle, up);
	        points.push(matrix.mulvector(new float3(0, 1, 0).scale(radius)).add(orign));
	    }
	    points.push(c);
	    return points;
	}

	class EdgeMolding {
	    static processpath_roundcorner(ves, normal, size) {
	        var res = [];
	        if (ves.length < 1)
	            return res;
	        var isloop = ves[0].equals(lstool.last(ves));
	        if (isloop)
	            ves.unshift(lstool.at(ves, -2));
	        res.push(ves[0]);
	        var i, j;
	        for (i = 1; i < ves.length - 1; i++) {
	            var u = ves[i - 1];
	            var v = ves[i + 0];
	            var w = ves[i + 1];
	            var ab = v.sub(u);
	            var bc = w.sub(v);
	            var arc0 = float3.lerp(v, u, size / ab.length);
	            var arc1;
	            var arc2 = float3.lerp(v, w, size / bc.length);
	            var coc = VectorCalc.rayCrossRay(new Ray(arc0, ab.cross(normal).normal()), new Ray(arc2, bc.cross(normal).normal()));
	            if (!coc) {
	                res.push(v);
	                continue;
	            }
	            var r = arc0.sub(coc).length;
	            var dir = float3.lerp(arc0, arc2, 0.5).sub(coc).normal();
	            arc1 = dir.scale(r).add(coc);
	            var points = ArcPoint3ToSegmentArray(arc0, arc1, arc2, CalcConst.DEGREES_TO_RADIANS * 10, size * 0.2);
	            for (j = 0; j < points.length; j++) {
	                res.push(points[j]);
	            }
	        }
	        res.push(lstool.last(ves));
	        if (isloop) {
	            res.shift();
	            res.pop();
	        }
	        return res;
	    }
	}

	class BoxBound {
	    constructor() {
	    }
	    static fromvertices(value) {
	        var res = new BoxBound();
	        if (value.length == 0)
	            return res;
	        var min = new float3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	        var max = new float3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	        var i;
	        for (i = 0; i < value.length; i++) {
	            var p = value[i];
	            max.x = Math.max(p.x, max.x);
	            max.y = Math.max(p.y, max.y);
	            max.z = Math.max(p.z, max.z);
	            min.x = Math.min(p.x, min.x);
	            min.y = Math.min(p.y, min.y);
	            min.z = Math.min(p.z, min.z);
	        }
	        res.max = max;
	        res.min = min;
	        res.size = max.sub(min);
	        res.center = float3.lerp(min, max, 0.5);
	        return res;
	    }
	    clone() {
	        var res = new BoxBound();
	        res.min = this.min.clone();
	        res.max = this.max.clone();
	        res.size = this.size.clone();
	        res.center = this.center.clone();
	        return res;
	    }
	    join(value) {
	        if (value.min == null || value.max == null)
	            return;
	        if (this.min == null || this.max == null) {
	            this.min = value.min;
	            this.max = value.max;
	        }
	        this.min = new float3(Math.min(this.min.x, value.min.x), Math.min(this.min.y, value.min.y), Math.min(this.min.z, value.min.z));
	        this.max = new float3(Math.max(this.max.x, value.max.x), Math.max(this.max.y, value.max.y), Math.max(this.max.z, value.max.z));
	        this.size = this.max.sub(this.min);
	        this.center = this.min.add(this.max).scale(0.5);
	    }
	    static CreateWithAB(a, b) {
	        var bb = new BoxBound();
	        bb.min = new float3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
	        bb.max = new float3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
	        bb.size = bb.max.sub(bb.min);
	        bb.center = bb.min.add(bb.max).scale(0.5);
	        return bb;
	    }
	    static CreateWithMinMax(min, max) {
	        var b = new BoxBound();
	        b.min = min;
	        b.max = max;
	        b.size = max.sub(min);
	        b.center = min.add(max).scale(0.5);
	        return b;
	    }
	    static CreateWithMinSize(min, size) {
	        var b = new BoxBound();
	        b.min = min;
	        b.size = size;
	        b.max = min.add(size);
	        b.center = min.add(size.scale(0.5));
	        return b;
	    }
	    intersectBounds(bound) {
	        var x = Math.abs(this.center.x - bound.center.x) <= this.size.x * 0.5 + bound.size.x * 0.5;
	        var y = Math.abs(this.center.y - bound.center.y) <= this.size.y * 0.5 + bound.size.y * 0.5;
	        var z = Math.abs(this.center.z - bound.center.z) <= this.size.z * 0.5 + bound.size.z * 0.5;
	        return x && y && z;
	    }
	    ContainBounds(bound, distance = CalcConst.dis_err) {
	        return this.nearless(this.min, bound.min) && this.neargreater(this.max, bound.max);
	    }
	    ContainPoint(point, distance = CalcConst.dis_err) {
	        return this.nearless(point, this.max, distance) && this.neargreater(point, this.min, distance);
	    }
	    nearless(a, b, distance = CalcConst.dis_err) {
	        return (a.x <= b.x + CalcConst.dis_err && a.y <= b.y + CalcConst.dis_err && a.z <= b.z + CalcConst.dis_err);
	    }
	    neargreater(a, b, distance = CalcConst.dis_err) {
	        return (a.x >= b.x - CalcConst.dis_err && a.y >= b.y - CalcConst.dis_err && a.z >= b.z - CalcConst.dis_err);
	    }
	}

	class EdgeStructureRayHit {
	    constructor() {
	        this.dis = Number.MAX_VALUE;
	        this.hit = null;
	        this.edgeidx = -1;
	    }
	}

	class ShapeRayHitRes {
	    constructor() {
	    }
	}
	class Shape {
	    constructor() {
	        this.ves = new Array();
	        this.sections = new Array();
	        this.normal = new float3();
	        this.center = null;
	        this.radius = 0;
	    }
	    join(shape) {
	        var head = shape.ves.length;
	        var i;
	        for (i = 0; i < shape.ves.length; i++) {
	            this.ves.push(shape.ves[i].clone());
	        }
	        for (i = 1; i < shape.sections.length; i++) {
	            this.sections.push(head + shape.sections[i]);
	        }
	    }
	    shift(value) {
	        var i, j;
	        for (i = 0; i < this.sections.length - 1; i++) {
	            if (value < this.sections[i])
	                continue;
	            break;
	        }
	        if (i == this.sections.length)
	            return;
	        var s0;
	        var s1;
	        var slen;
	        s0 = this.sections[i];
	        s1 = this.sections[i + 1];
	        slen = s1 - s0;
	        if (value == s0)
	            return;
	        var list = [];
	        for (j = value; j < s1; j++) {
	            list.push(this.ves[j]);
	        }
	        for (j = s0; j < value; j++) {
	            list.push(this.ves[j]);
	        }
	        for (j = 0; j < slen; j++) {
	            this.ves[s0 + j] = list[j];
	        }
	    }
	    segment_hittest(v, w, tolerance = +CalcConst.dis_err) {
	        var i, j;
	        var s0;
	        var slen;
	        var va;
	        var vb;
	        for (i = 0; i < this.sections.length - 1; i++) {
	            s0 = this.sections[i];
	            slen = this.sections[i + 1] - this.sections[i];
	            for (j = 0; j < slen; j++) {
	                va = this.ves[j + 0 + s0];
	                vb = this.ves[(j + 1) % slen + s0];
	                if (VectorCalc.SegmentCrossSegment(v, w, va, vb, tolerance) == null)
	                    continue;
	                return true;
	            }
	        }
	        return false;
	    }
	    crosssection(ray) {
	        var res = [];
	        var i;
	        var head;
	        var hits = [];
	        var cutpos = ray.pos.sub(ray.pos.sub(this.ves[0]).proj(this.normal));
	        var cutdir = this.normal.cross(ray.dir).normal();
	        head = new Ray(cutpos, cutdir);
	        while (true) {
	            var hit = this.rayhit(head);
	            if (hit == null)
	                break;
	            var v = this.ves[hit.edgeidv];
	            var w = this.ves[hit.edgeidw];
	            hits.push(new Ray(hit.pos, float3.dir(v, w).cross(this.normal)));
	            head.pos = hit.pos.add(head.dir.scale(CalcConst.unit));
	        }
	        hits = hits.reverse();
	        head = new Ray(cutpos, cutdir.negate());
	        while (true) {
	            var hit = this.rayhit(head);
	            if (hit == null)
	                break;
	            var v = this.ves[hit.edgeidv];
	            var w = this.ves[hit.edgeidw];
	            hits.push(new Ray(hit.pos, float3.dir(v, w).cross(this.normal)));
	            head.pos = hit.pos.add(head.dir.scale(CalcConst.unit));
	        }
	        for (i = 0; i < hits.length - 1; i++) {
	            var hit0 = hits[i];
	            var hit1 = hits[i + 1];
	            var dir = hit1.pos.sub(hit0.pos);
	            if (dir.dot(hit0.dir) >= 0 || dir.dot(hit1.dir) <= 0)
	                continue;
	            res.push(hit0.pos, hit1.pos);
	        }
	        return res;
	    }
	    getedgepoints(egid) {
	        var i;
	        for (i = 0; i < this.sections.length; i++) {
	            if (egid < this.sections[i + 1])
	                break;
	        }
	        if (i >= this.sections.length - 1)
	            return null;
	        var s0 = this.sections[i];
	        var s1 = this.sections[i + 1];
	        var w = ((egid - s0 + 1) % (s1 - s0)) + s0;
	        return [this.ves[egid], this.ves[w]];
	    }
	    rayhit(ray) {
	        var i, j;
	        var s0;
	        var s1;
	        var hit;
	        var dis;
	        var bst_hit;
	        var bst_dis = Number.MAX_VALUE;
	        var bst_edgeidv, bst_edgeidw;
	        var bst_sectionid;
	        var v, w;
	        var r = ray.dir.cross(this.normal);
	        for (i = 0; i < this.sections.length - 1; i++) {
	            s0 = this.sections[i];
	            s1 = this.sections[i + 1];
	            for (j = s0; j < s1 - 1; j++) {
	                v = this.ves[j];
	                w = this.ves[j + 1];
	                if (Math.abs(v.sub(w).dot(r)) < CalcConst.nearzero)
	                    continue;
	                hit = VectorCalc.rayCrossSegment(ray, v, w, CalcConst.dis_err, false);
	                if (hit == null)
	                    continue;
	                dis = ray.pos.sub(hit).lengthSq;
	                if (dis >= bst_dis)
	                    continue;
	                bst_hit = hit;
	                bst_dis = dis;
	                bst_edgeidv = j;
	                bst_edgeidw = j + 1;
	                bst_sectionid = i;
	            }
	            v = this.ves[s1 - 1];
	            w = this.ves[s0];
	            if (Math.abs(v.sub(w).dot(r)) < CalcConst.nearzero)
	                continue;
	            hit = VectorCalc.rayCrossSegment(ray, v, w, CalcConst.dis_err, false);
	            if (hit == null)
	                continue;
	            dis = ray.pos.sub(hit).lengthSq;
	            if (dis >= bst_dis)
	                continue;
	            bst_hit = hit;
	            bst_dis = dis;
	            bst_edgeidv = s1 - 1;
	            bst_edgeidw = s0;
	            bst_sectionid = i;
	        }
	        if (bst_dis == Number.MAX_VALUE)
	            return null;
	        var res = new ShapeRayHitRes();
	        res.pos = bst_hit;
	        res.dis = bst_dis;
	        res.edgeidv = bst_edgeidv;
	        res.edgeidw = bst_edgeidw;
	        res.sectionid = bst_sectionid;
	        return res;
	    }
	    IsConvex() {
	        var i;
	        var n, m;
	        var res = true;
	        i = 0;
	        n = this.ves[i + 1].sub(this.ves[i + 0]).normal();
	        for (i = 0; i < this.ves.length - 2; i++) {
	            m = this.ves[i + 2].sub(this.ves[i + 1]).normal();
	            if (VectorCalc.angle(n, m, this.normal) < CalcConst.nearzero) {
	                res = false;
	                break;
	            }
	            n = m;
	        }
	        return res;
	    }
	    GetSectionsCount() {
	        return this.sections.length - 1;
	    }
	    GetSectionVertices(index) {
	        var is0, is1;
	        is0 = this.sections[index + 0];
	        is1 = this.sections[index + 1];
	        var ans = new Array();
	        for (var k = is0; k < is1; k++) {
	            ans.push(this.ves[k]);
	        }
	        return ans;
	    }
	    CalculateBoxBounds() {
	        this.boxbound = BoxBound.fromvertices(this.ves);
	    }
	    clear() {
	        this.ves.length = 0;
	        this.sections.length = 0;
	        this.normal = new float3();
	        this.center = null;
	        this.radius = 0;
	    }
	    ProjectToPlane(pos, normal) {
	        if (this.ves.length == 0)
	            return;
	        var offset = this.ves[0].sub(pos).proj(normal);
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            v.fill(v.sub(offset));
	        }
	    }
	    get length() {
	        return this.ves.length;
	    }
	    isLoop(dis_err = 0.001) {
	        if (this.ves.length < 3)
	            return false;
	        return this.ves[0].nearequals(this.ves[this.ves.length - 1], dis_err);
	    }
	    applyTransform(matrix) {
	        var i = 0;
	        var zero = matrix.mulvector(new float3());
	        for (i = 0; i < this.ves.length; i++) {
	            this.ves[i] = matrix.mulvector(this.ves[i]);
	        }
	        this.normal = matrix.mulvector(this.normal).sub(zero).normal();
	    }
	    getDirectionalLimit(dir, out_a, out_b) {
	        if (this.ves.length == 0)
	            return;
	        var minPos = this.ves[0];
	        var maxPos = this.ves[0];
	        for (var i = 0; i < this.ves.length; i++) {
	            var p = this.ves[i];
	            if (minPos.dot(dir) > p.dot(dir)) {
	                minPos = p;
	            }
	            if (maxPos.dot(dir) < p.dot(dir)) {
	                maxPos = p;
	            }
	        }
	        out_a.fill(minPos);
	        out_b.fill(maxPos);
	    }
	    Simplify(dis_err = CalcConst.dis_err) {
	        return this.SimplifyVes(dis_err) + this.SimplifyLines(dis_err);
	    }
	    SimplifyVes(dis_err = CalcConst.dis_err) {
	        var i, j, k;
	        var va;
	        var vb;
	        var s0, slen;
	        var count = 0;
	        for (i = 0; i < this.sections.length - 1; i++) {
	            // 丢弃连续的重复点
	            s0 = this.sections[i];
	            slen = this.sections[i + 1] - this.sections[i];
	            for (j = 0; j < slen; j++) {
	                va = this.ves[j + 0 + s0];
	                vb = this.ves[(j + 1) % slen + s0];
	                if (va.nearequals(vb, dis_err)) {
	                    this.ves.splice(j + 0 + s0, 1);
	                    count++;
	                    j--;
	                    for (k = i + 1; k < this.sections.length; k++) {
	                        this.sections[k] -= 1;
	                    }
	                    slen = this.sections[i + 1] - this.sections[i];
	                }
	            }
	        }
	        return count;
	    }
	    SimplifyLines(dis_err = CalcConst.dis_err) {
	        var i, j, k;
	        var va;
	        var vb;
	        var vc;
	        var s0, slen;
	        var count = 0;
	        if (this.normal == null || this.normal.lengthSq < 1 - CalcConst.nearzero)
	            return count;
	        for (i = 0; i < this.sections.length - 1; i++) {
	            // 丢弃共线的中途点
	            //
	            //case a   o---o---o	=>	o-------o
	            //
	            //case b	o-------0	=>	o---o
	            //			    o---↵
	            //
	            s0 = this.sections[i];
	            slen = this.sections[i + 1] - this.sections[i];
	            for (j = 0; j < slen; j++) {
	                va = this.ves[j + 0 + s0];
	                vb = this.ves[(j + 1) % slen + s0];
	                vc = this.ves[(j + 2) % slen + s0];
	                if (Math.abs(vc.sub(va).crossnormalize(this.normal).dot(vb.sub(va))) > dis_err)
	                    continue;
	                var n0 = float3.dir(va, vb);
	                var n1 = float3.dir(vb, vc);
	                var angular_condition = Math.abs(n0.dot(n1)) > 1 - CalcConst.dot_err;
	                var distance_condition = Math.abs(n0.cross(this.normal).dot(vc.sub(va))) < dis_err;
	                if (!angular_condition && !distance_condition)
	                    continue;
	                this.ves.splice((j + 1) % slen + s0, 1);
	                j--;
	                count++;
	                for (k = i + 1; k < this.sections.length; k++) {
	                    this.sections[k] -= 1;
	                }
	                slen = this.sections[i + 1] - this.sections[i];
	            }
	        }
	        return count;
	    }
	    toCode() {
	        var result = new String();
	        result += "var loop:Shape = new Shape();";
	        result += "\n";
	        result += "loop.ves = Array<float3>([";
	        for (var i = 0; i < this.ves.length - 1; i++) {
	            result += this.ves[i].toPreciseString() + ",";
	        }
	        result += this.ves[i].toPreciseString() + "";
	        result += "])";
	        return result;
	    }
	    toString() {
	        var result = new String();
	        result += "vertices: ";
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            result += this.ves[i].toString() + ",";
	        }
	        result += "\n";
	        result += "normal: ";
	        result = this.normal.toString() + "";
	        return result;
	    }
	    clone() {
	        var r = new Shape();
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            r.ves.push(this.ves[i].clone());
	        }
	        r.normal = this.normal.clone();
	        r.sections = this.sections.concat();
	        if (this.boxbound)
	            r.boxbound = this.boxbound.clone();
	        return r;
	    }
	    CalculateCenter() {
	        var scale = 1 / this.ves.length;
	        var sum = new float3();
	        for (var i = 0; i < this.ves.length; i++) {
	            sum = sum.advance(this.ves[i], scale);
	        }
	        this.center = sum;
	    }
	    CalculateRadius() {
	        if (this.center == null)
	            this.CalculateCenter();
	        var best_dis = 0;
	        for (var i = 0; i < this.ves.length; i++) {
	            var dis = this.ves[i].sub(this.center).lengthSq;
	            if (best_dis < dis) {
	                best_dis = dis;
	            }
	        }
	        this.radius = Math.sqrt(best_dis);
	    }
	    hasPoint(point, epsilon = 0.0001) {
	        for (var i = 0; i < this.ves.length; i++) {
	            if (this.ves[i].nearequals(point, epsilon)) {
	                return true;
	            }
	        }
	        return false;
	    }
	    getPoint(point, epsilon = 0.0001) {
	        for (var i = 0; i < this.ves.length; i++) {
	            if (this.ves[i].nearequals(point, epsilon)) {
	                return this.ves[i];
	            }
	        }
	        return null;
	    }
	    segmentsContainPoint(point, distance_error = 0.0001) {
	        var ans = -1;
	        for (var i = 0; i < this.sections.length - 1; i++) {
	            var s0 = this.sections[i];
	            var s1 = this.sections[i + 1];
	            var slen = s1 - s0;
	            var a, b;
	            for (var j = 0; j < slen - 1; j++) {
	                a = this.ves[s0 + j + 0];
	                b = this.ves[s0 + j + 1];
	                if (VectorCalc.segmentContainPointF(a, b, point, distance_error)) {
	                    ans = s0 + j + 0;
	                    break;
	                }
	            }
	            if (ans > 0)
	                break;
	            a = this.ves[s0 + slen - 1];
	            b = this.ves[s0];
	            if (!VectorCalc.segmentContainPointF(a, b, point, distance_error))
	                continue;
	            ans = s0 + slen - 1;
	        }
	        return ans;
	    }
	    /*
	    * -1   angle sum <= -2PI
	    * 0    no hit
	    * +1   angle sum >= +2PI
	    * 2    hit vertex
	    * 3    hit segment
	    */ SectionContainPointANGLESUM(point, section_start, section_end) {
	        var i;
	        var angle_sum = 0;
	        var sta = this.sections[section_start];
	        var len = this.sections[section_end] - this.sections[section_start];
	        var res = 0;
	        var earlystop = false;
	        i = 0;
	        var v0 = this.ves[sta + i];
	        var d0 = v0.sub(point);
	        var nd0 = d0.normalf();
	        for (; i < len; i++) {
	            var v1 = this.ves[sta + (i + 1) % len];
	            var d1 = v1.sub(point);
	            if (d0.lengthSq < CalcConst.dissq_err) {
	                res = 2; //hit vertex
	                earlystop = true;
	                break;
	            }
	            var nd1 = d1.normalf();
	            var delta_eular = VectorCalc.angle(nd0, nd1, this.normal);
	            //      v0
	            //<-out |  -dis- p
	            //      v1
	            if (delta_eular > Math.PI - CalcConst.nearzero) {
	                if (Math.abs(float3.dirf(v0, v1).cross(this.normal).dot(d0)) < CalcConst.nearzero) {
	                    res = 3; //hit segment
	                    earlystop = true;
	                    break;
	                }
	            }
	            angle_sum += delta_eular;
	            v0 = v1;
	            d0 = d1;
	            nd0 = nd1;
	        }
	        if (!earlystop) {
	            if (angle_sum > Math.PI * 2 - CalcConst.nearzero)
	                res = 1;
	            else if (angle_sum < -Math.PI * 2 + CalcConst.nearzero)
	                res = -1;
	        }
	        return res;
	    }
	    /*
	    * use counter-clockwise!!!
	    * 0    outside
	    * 1    inside
	    * 3    hit segment
	    * 5    hit vertex
	    */ ContainPointANGLESUM(point) {
	        var res = 0;
	        var hit = this.SectionContainPointANGLESUM(point, 0, 1);
	        if (hit == 0)
	            return res;
	        res = hit;
	        if (hit > 1)
	            return res;
	        var i;
	        var innerhit = 0;
	        for (i = 1; i < this.sections.length - 1; i++) {
	            innerhit = this.SectionContainPointANGLESUM(point, i, i + 1);
	            if (innerhit == 0)
	                continue;
	            if (innerhit == -1) {
	                res = 0;
	                break;
	            }
	            if (innerhit > 1 && hit == 1) {
	                res = innerhit;
	                break;
	            }
	        }
	        return res;
	    }
	    CalculateNormal(epsilon = 0.0001) {
	        var i = 0;
	        var a;
	        var b;
	        var ab;
	        var vsize = this.ves.length;
	        for (i = 0; i < vsize; i++) {
	            a = this.ves[(i - 1 + vsize) % vsize];
	            b = this.ves[i];
	            ab = b.sub(a);
	            if (ab.lengthSq > 0)
	                break;
	        }
	        this.normal = null;
	        while (i < vsize) {
	            var c = this.ves[i + 0];
	            var d = this.ves[(i + 1) % vsize];
	            this.normal = ab.cross(d.sub(c));
	            if (this.normal.lengthSq > epsilon) {
	                break;
	            }
	            i++;
	        }
	        if (this.normal == null) {
	            return;
	        }
	        this.normal = this.normal.normal();
	    }
	    Invert() {
	        var res = this.clone();
	        for (var i = 0; i < res.sections.length - 1; i++) {
	            var s0 = res.sections[i];
	            var s1 = res.sections[i + 1];
	            var slen = s1 - s0;
	            for (var j = 0; j < slen / 2; j++) {
	                var a = res.ves[s0 + j];
	                var b = res.ves[s0 + (slen - 1) - j];
	                res.ves[s0 + j] = b;
	                res.ves[s0 + (slen - 1) - j] = a;
	            }
	        }
	        res.normal = res.normal.negate();
	        return res;
	    }
	    containPointRAY(point, distance_error = 0.0001, jump_radian = 0.017444) {
	        if (this.normal.lengthSq == 0)
	            this.CalculateNormal();
	        var dot = Math.abs(point.sub(this.ves[0]).dot(this.normal));
	        if (dot > distance_error) {
	            return 0;
	        }
	        if (this.center == null)
	            this.CalculateRadius();
	        if (point.sub(this.center).length > this.radius + distance_error)
	            return 0;
	        var ray = new Ray(point, float3.lerp(this.ves[0], this.ves[1], 0.5).sub(point).normal());
	        var rot = tensor3.eular(this.normal.scale(jump_radian)); // jump some angle
	        if (this.sections.length == 0 && this.ves.length > 0) {
	            this.sections.push(0, this.ves.length);
	        }
	        var check = true;
	        while (check) {
	            var count0 = 0;
	            var count1 = 0;
	            ray.dir = rot.mulvector(ray.dir);
	            Shape.debug_ray = ray;
	            ray.dir = ray.dir.cancel(this.normal);
	            check = false;
	            for (var i = 0; i < this.sections.length - 1; i++) {
	                var s0 = this.sections[i];
	                var s1 = this.sections[i + 1];
	                var slen = s1 - s0;
	                for (var j = 0; j < slen; j++) {
	                    var a = this.ves[s0 + j + 0];
	                    var b = this.ves[s0 + ((j + 1) % slen)];
	                    var ab = b.sub(a);
	                    var Nab = ab.normal();
	                    var sab = ab.dot(Nab);
	                    var ap = point.sub(a);
	                    var sap = ap.dot(Nab);
	                    if (Math.abs(Nab.cross(this.normal).dot(ap)) < distance_error && MathCalc.betweenEqual(sap, 0 - distance_error, sab + distance_error)) {
	                        if (Math.abs(sap - 0) < distance_error || Math.abs(sap - sab) < distance_error) {
	                            return 7;
	                        }
	                        return 3;
	                    }
	                    else {
	                        var hit = VectorCalc.rayCrossSegment(ray, a, b, distance_error, true);
	                        if (hit != null) {
	                            if (hit.nearequals(a, distance_error) || hit.nearequals(b, distance_error)) {
	                                check = true;
	                                break;
	                            }
	                            var dis = hit.sub(point).dot(ray.dir);
	                            if (dis > 0) {
	                                count0++;
	                            }
	                            else {
	                                count1++;
	                            }
	                            if (Shape.debug_hits != null)
	                                Shape.debug_hits.push(hit);
	                        }
	                    }
	                }
	            }
	            if (check) {
	                continue;
	            }
	            if (count0 % 2 == 1 && count1 % 2 == 1)
	                return 1;
	            return 0;
	        }
	        return 0;
	    }
	    // Section Not Support
	    MakePositive(normal = null, unit = 1, epsilon = 0.0001) {
	        this.CalculateNormal();
	        if (normal != null && this.normal.dot(normal) < 0) {
	            this.normal = this.normal.negate();
	        }
	        var a = this.ves[0];
	        var b = this.ves[1];
	        var mid = float3.lerp(a, b, 0.5);
	        var out = b.sub(a).cross(this.normal).normal();
	        var p = mid.advance(out, unit);
	        if (this.containPointRAY(p) > 0) {
	            this.ves = this.ves.reverse();
	            return true;
	        }
	        return false;
	    }
	    IsPositive(normal = null, unit = CalcConst.unit) {
	        this.CalculateNormal();
	        if (normal != null && this.normal.dot(normal) < 0) {
	            this.normal = this.normal.negate();
	        }
	        var a = this.ves[0];
	        var b = this.ves[1];
	        var mid = float3.lerp(a, b, 0.5);
	        var out = b.sub(a).cross(this.normal).normal();
	        var p = mid.advance(out, -unit);
	        return this.containPointRAY(p) > 0;
	    }
	}

	class StringHelper {
	    constructor(source = null) {
	        this.ascii = new Map();
	        this.userkeys = new Map();
	        this.index = 0;
	        if (source != null) {
	            this.source = source;
	        }
	        this.ascii;
	        {
	            // ASCII	
	            // \b 退格(BS) ，将当前位置移到前一列
	            // \f 换页(FF)，将当前位置移到下页开头
	            // \n 换行(LF) ，将当前位置移到下一行开头
	            // \r 回车(CR) ，将当前位置移到本行开头
	            // \t 水平制表(HT) （跳到下一个TAB位置）
	            // \v 垂直制表(VT)
	            this.ascii["\b"] = true;
	            this.ascii["\f"] = true;
	            this.ascii["\n"] = true;
	            this.ascii["\r"] = true;
	            this.ascii["\t"] = true;
	            this.ascii["\v"] = true;
	        }
	        this.userkeys;
	        {
	            this.userkeys[" "] = true;
	            this.userkeys[";"] = true;
	            this.userkeys[","] = true;
	            this.userkeys["."] = true;
	        }
	    }
	    static isNull(string) {
	        return string == null || string.length == 0;
	    }
	    ReadLine() {
	        return this.ReadAB(null, "\n");
	    }
	    ReadWord() {
	        this.JumpNotWord();
	        var head = this.index;
	        this.JumpWord();
	        if (this.index - head == 0)
	            return null;
	        return this.source.substring(head, this.index);
	    }
	    Jump(tag) {
	        var head;
	        head = this.source.indexOf(tag, this.index);
	        if (head < 0)
	            return false;
	        var taglen = tag.length;
	        this.index = head + taglen;
	        return true;
	    }
	    ReadBracket(starttag, endtag) {
	        var sum = 0;
	        var i;
	        var res = null;
	        var head = this.index;
	        head = this.source.indexOf(starttag, this.index);
	        if (head < 0)
	            return res;
	        for (i = head; i < this.source.length; i++) {
	            var c = this.source[i];
	            if (c == starttag) {
	                sum++;
	            }
	            else if (c == endtag) {
	                sum--;
	                if (sum != 0)
	                    continue;
	                break;
	            }
	        }
	        if (i >= this.source.length)
	            return res;
	        var end = i;
	        this.index = end + endtag.length;
	        res = this.source.substring(head, end + endtag.length);
	        return res;
	    }
	    ReadBracketContent(starttag, endtag) {
	        var sum = 0;
	        var i;
	        var res = null;
	        var head = this.index;
	        head = this.source.indexOf(starttag, this.index);
	        if (head < 0)
	            return res;
	        for (i = head; i < this.source.length; i++) {
	            var c = this.source[i];
	            if (c == starttag) {
	                sum++;
	            }
	            else if (c == endtag) {
	                sum--;
	                if (sum != 0)
	                    continue;
	                break;
	            }
	        }
	        if (i >= this.source.length)
	            return res;
	        var end = i;
	        this.index = end + endtag.length;
	        res = this.source.substring(head + starttag.length, end);
	        return res;
	    }
	    JumpNotWord() {
	        while (this.index < this.source.length) {
	            var head = this.source.substr(this.index, 1);
	            if (this.ascii[head] == true || this.userkeys[head] == true) {
	                this.index++;
	            }
	            else {
	                break;
	            }
	        }
	    }
	    JumpWord() {
	        while (this.index < this.source.length) {
	            var head = this.source.substr(this.index, 1);
	            if (this.ascii[head] == true || this.userkeys[head] == true) {
	                break;
	            }
	            this.index++;
	        }
	    }
	    ReadAB(starttag = null, endtag = null) {
	        if (this.index >= this.source.length || this.index < 0) {
	            this.index = -1;
	            return null;
	        }
	        var starttaglen = 0;
	        var head;
	        {
	            if (starttag != null) {
	                head = this.source.indexOf(starttag, this.index);
	                if (head < 0)
	                    return null;
	                starttaglen = starttag.length;
	            }
	            else {
	                head = this.index;
	                starttaglen = 0;
	            }
	        }
	        if (head + starttaglen == this.source.length) {
	            this.index = -1;
	            return null;
	        }
	        var next;
	        {
	            if (endtag != null) {
	                next = this.source.indexOf(endtag, head + starttaglen);
	                if (next < 0) {
	                    next = this.source.length;
	                }
	                else {
	                    next += endtag.length;
	                }
	            }
	            else {
	                next = this.source.length;
	            }
	        }
	        this.index = next;
	        if (this.index >= this.source.length)
	            this.index = -1;
	        var res = this.source.substring(head, next);
	        return res;
	    }
	    ReadABContent(starttag, endtag = null) {
	        if (this.index >= this.source.length || this.index < 0) {
	            this.index = -1;
	            return null;
	        }
	        var starttaglen = 0;
	        var head;
	        {
	            if (starttag != null) {
	                head = this.source.indexOf(starttag, this.index);
	                if (head < 0)
	                    return null;
	                starttaglen = starttag.length;
	            }
	            else {
	                head = this.index;
	                starttaglen = 0;
	            }
	        }
	        if (head + starttaglen == this.source.length) {
	            this.index = -1;
	            return null;
	        }
	        var endtaglen = 0;
	        var next;
	        {
	            if (endtag != null) {
	                next = this.source.indexOf(endtag, head + starttaglen);
	                if (next < 0) {
	                    next = this.source.length;
	                }
	                else {
	                    endtaglen = endtag.length;
	                }
	            }
	            else {
	                next = this.source.length;
	            }
	        }
	        this.index = next + endtaglen;
	        if (this.index >= this.source.length) {
	            this.index = -1;
	        }
	        var res = this.source.substring(head + starttaglen, next);
	        return res;
	    }
	    Contain(value) {
	        return this.source.indexOf(value.toString()) >= 0;
	    }
	}

	class Edge {
	    constructor(v = -1, w = -1, tag = -1, usermark = -1) {
	        this.v = -1;
	        this.w = -1;
	        this.tag = -1;
	        this.usermark = -1;
	        this.reftag = -1;
	        this.structuretag = -1;
	        //public edgedata: EdgeData = new EdgeData();
	        this.calc_n = new float3();
	        this.calc_o = new float3();
	        this.calc_r = 0;
	        this.v = v;
	        this.w = w;
	        this.tag = tag;
	        this.usermark = usermark;
	    }
	    build_calc(ves) {
	        var va = ves[this.v];
	        var vb = ves[this.w];
	        var diff = vb.sub(va);
	        this.calc_n.fill(diff.normalf());
	        this.calc_o.fill(diff.scale(0.5).add(va));
	        this.calc_r = this.calc_n.dot(vb.sub(this.calc_o));
	    }
	    clone() {
	        var res = new Edge(this.v, this.w);
	        res.tag = this.tag;
	        res.usermark = this.usermark;
	        res.reftag = this.reftag;
	        res.structuretag = this.structuretag;
	        //res.edgedata = this.edgedata.clone();
	        return res;
	    }
	    equals(edge) {
	        return (this.v - edge.v) * (this.v - edge.w) == 0 && (this.w - edge.v) * (this.w - edge.w) == 0;
	    }
	}
	class EdgeData {
	    constructor() {
	    }
	    clone() {
	        var res = new EdgeData();
	        return res;
	    }
	}
	class EdgeShape {
	    constructor() {
	        this.egs = new Array();
	        this.indices = new Array();
	        this.egps = new Array();
	        this.sections = [];
	        this.dir = null;
	        this.normal = null;
	        this.is_poly = false;
	    }
	    shift(value) {
	        var i, j;
	        for (i = 0; i < this.sections.length - 1; i++) {
	            if (value < this.sections[i])
	                continue;
	            break;
	        }
	        if (i == this.sections.length)
	            return;
	        var s0;
	        var s1;
	        var slen;
	        s0 = this.sections[i];
	        s1 = this.sections[i + 1];
	        slen = s1 - s0;
	        if (value == s0)
	            return;
	        var list_indices = [];
	        var list_egs = [];
	        lstool.attachrange(list_indices, this.indices, value, s1);
	        lstool.attachrange(list_indices, this.indices, s0, value);
	        lstool.attachrange(list_egs, this.indices, value, s1);
	        lstool.attachrange(list_egs, this.indices, s0, value);
	        for (j = 0; j < slen; j++) {
	            this.indices[s0 + j] = list_indices[j];
	            this.egs[s0 + j] = list_egs[j];
	        }
	    }
	    build_vectorloop(ves, normal) {
	        var vl = new Shape();
	        var j;
	        for (j = 0; j < this.indices.length; j++) {
	            vl.ves.push(ves[this.indices[j]].clone());
	        }
	        vl.normal = normal.clone();
	        vl.sections.length = 0;
	        vl.sections.push(0);
	        vl.sections.push(vl.ves.length);
	        vl.CalculateBoxBounds();
	        return vl;
	    }
	    clone() {
	        var ep = new EdgeShape();
	        ep.egs = this.egs.concat();
	        ep.indices = this.indices.concat();
	        ep.egps = this.egps.concat();
	        ep.sections = this.sections.concat();
	        ep.dir = this.dir ? this.dir.clone() : this.dir;
	        ep.normal = this.normal ? this.normal.clone() : this.normal;
	        ep.is_poly = this.is_poly;
	        return ep;
	    }
	}
	class EdgeHull {
	    constructor() {
	    }
	}
	class EdgeStructure {
	    constructor() {
	        this.ves = new Array();
	        this.egs = new Array();
	        this.normal = new float3();
	        this.boxbound = new BoxBound();
	        this.structuretag = -1;
	        this.calc_ready = false;
	    }
	    tojson(p = CalcConst.precision) {
	        var i;
	        var ans = '';
	        ans += '{';
	        ans += "name:'EdgeStructure',";
	        ans += "normal:'" + this.normal.toString() + "',";
	        ans += 'ves:';
	        ans += float3.ListToString(this.ves, p);
	        ans += ',';
	        ans += 'egs:[';
	        for (i = 0; i < this.egs.length; i++) {
	            var sg = this.egs[i];
	            var sgs = '';
	            sgs += '{';
	            sgs += 'v:' + sg.v + ',';
	            sgs += 'w:' + sg.w + ',';
	            sgs += 'tag:' + sg.tag + ',';
	            sgs += 'usermark:' + sg.usermark + ',';
	            sgs += '},';
	            ans += sgs;
	        }
	        ans += ']}';
	        return ans;
	    }
	    static fromjson(str) {
	        var res = new EdgeStructure();
	        res.clear();
	        var sh = new StringHelper(str);
	        var s;
	        s = sh.ReadAB("normal:'", "',");
	        res.normal = float3.fromString(s);
	        s = sh.ReadAB('ves:[', ']');
	        res.ves = float3.fromStringList(s);
	        sh.Jump('egs:');
	        s = sh.ReadBracketContent('[', ']');
	        var psh = new StringHelper(s);
	        while (psh.Jump('{')) {
	            var eg = new Edge();
	            eg.v = Number(psh.ReadABContent('v:', ','));
	            eg.w = Number(psh.ReadABContent('w:', ','));
	            eg.tag = Number(psh.ReadABContent('tag:', ','));
	            eg.usermark = Number(psh.ReadABContent('mark:', ','));
	            res.egs.push(eg);
	        }
	        return res;
	    }
	    build_calc() {
	        var i;
	        var eg;
	        for (i = 0; i < this.egs.length; i++) {
	            eg = this.egs[i];
	            eg.build_calc(this.ves);
	        }
	        this.calc_ready = true;
	    }
	    heal_ves() {
	        var good = [];
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            var status = v && isFinite(v.x) && isFinite(v.y) && isFinite(v.z);
	            good.push(status);
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            var eg = this.egs[i];
	            if (good[eg.v] && good[eg.w])
	                continue;
	            this.egs.splice(i--, 1);
	        }
	    }
	    segment_hittest(v, w, tolerance = +CalcConst.dis_err) {
	        var i;
	        var ves = this.ves;
	        for (i = 0; i < this.egs.length; i++) {
	            var eg = this.egs[i];
	            if (VectorCalc.SegmentCrossSegment(v, w, ves[eg.v], ves[eg.w], tolerance) == null)
	                continue;
	            return true;
	        }
	        return false;
	    }
	    CalculateBoxBounds() {
	        this.boxbound = BoxBound.fromvertices(this.ves);
	    }
	    clear() {
	        this.ves.length = 0;
	        this.egs.length = 0;
	    }
	    clone() {
	        var res = new EdgeStructure();
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            res.ves.push(this.ves[i].clone());
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            res.egs.push(this.egs[i].clone());
	        }
	        res.normal = this.normal.clone();
	        res.structuretag = this.structuretag;
	        return res;
	    }
	    vexToString(p = 4) {
	        return float3.ListToString(this.ves, p);
	    }
	    egsToString() {
	        var res = new String();
	        res += "[";
	        if (this.egs.length > 0) {
	            for (var i = 0; i < this.egs.length - 1; i++) {
	                res += this.egs[i].v + "," + this.egs[i].w + ",";
	            }
	            res += this.egs[i].v + "," + this.egs[i].w;
	        }
	        res += "]";
	        return res;
	    }
	    CalcuBoxBounds() {
	        if (this.ves.length == 0) {
	            return new BoxBound();
	        }
	        var min = this.ves[0].clone();
	        var max = this.ves[0].clone();
	        for (var i = 0; i < this.ves.length; i++) {
	            min.x = Math.min(this.ves[i].x, min.x);
	            min.y = Math.min(this.ves[i].y, min.y);
	            min.z = Math.min(this.ves[i].z, min.z);
	            max.x = Math.max(this.ves[i].x, max.x);
	            max.y = Math.max(this.ves[i].y, max.y);
	            max.z = Math.max(this.ves[i].z, max.z);
	        }
	        var bounds = BoxBound.CreateWithMinMax(min, max);
	        return bounds;
	    }
	    applyTransform(t) {
	        var zero = t.mulvector(new float3());
	        this.normal = t.mulvector(this.normal).sub(zero).normal();
	        for (var i = 0; i < this.ves.length; i++) {
	            this.ves[i] = t.mulvector(this.ves[i]);
	        }
	    }
	    BuildEdgeID() {
	        var edgeidcount = 0;
	        for (var i = 0; i < this.egs.length; i++) {
	            this.egs[i].tag = edgeidcount++;
	        }
	    }
	    getEdgeVec(edgeidx, out_v, out_w) {
	        var eg = this.egs[edgeidx];
	        out_v.fill(this.ves[eg.v]);
	        out_w.fill(this.ves[eg.w]);
	    }
	    raycastWithFilter(ray, filter) {
	        var i;
	        var bst_dis = Number.MAX_VALUE;
	        var bst_egidx = -1;
	        var bst_hit;
	        for (i = 0; i < this.egs.length; i++) {
	            if (filter[i] == true)
	                continue;
	            var eg = this.egs[i];
	            var hit = VectorCalc.rayCrossSegment(ray, this.ves[eg.v], this.ves[eg.w], CalcConst.dis_err);
	            if (hit == null)
	                continue;
	            var dis = ray.pos.sub(hit).lengthSq;
	            if (dis < CalcConst.dissq_err)
	                continue;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_egidx = i;
	                bst_hit = hit;
	            }
	        }
	        if (bst_dis == Number.MAX_VALUE)
	            return null;
	        var res = new EdgeStructureRayHit();
	        res.dis = bst_dis;
	        res.edgeidx = bst_egidx;
	        res.hit = bst_hit;
	        return res;
	    }
	    raycast(ray) {
	        var i;
	        var bst_dis = Number.MAX_VALUE;
	        var bst_egidx = -1;
	        var bst_hit;
	        for (i = 0; i < this.egs.length; i++) {
	            var eg = this.egs[i];
	            var hit = VectorCalc.rayCrossSegment(ray, this.ves[eg.v], this.ves[eg.w], CalcConst.dis_err);
	            if (hit == null)
	                continue;
	            var dis = ray.pos.sub(hit).lengthSq;
	            if (dis < CalcConst.dissq_err)
	                continue;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_egidx = i;
	                bst_hit = hit;
	            }
	        }
	        if (bst_dis == Number.MAX_VALUE)
	            return null;
	        var res = new EdgeStructureRayHit();
	        res.dis = Math.sqrt(bst_dis);
	        res.edgeidx = bst_egidx;
	        res.hit = bst_hit;
	        return res;
	    }
	    addstructure(es, usermark = -1) {
	        var i;
	        for (i = 0; i < es.egs.length; i++) {
	            var eg = es.egs[i];
	            var neg = this.addsegment(es.ves[eg.v], es.ves[eg.w], eg.tag, usermark);
	            neg.usermark = eg.usermark;
	            neg.reftag = eg.reftag;
	        }
	    }
	    addshape(vl, tag = -1, usermark = -1) {
	        var i, j;
	        for (i = 0; i < vl.sections.length - 1; i++) {
	            var s0 = vl.sections[i];
	            var slen = vl.sections[i + 1] - s0;
	            for (j = 0; j < slen; j++) {
	                this.addsegment(vl.ves[j + s0], vl.ves[(j + 1) % slen + s0], tag, usermark);
	            }
	        }
	    }
	    addloop(ves, tag = -1, usermark = -1) {
	        var i;
	        var v, w;
	        var iv, iw;
	        v = ves[0];
	        iv = this.addpoint(v);
	        for (i = 0; i < ves.length; i++) {
	            w = ves[(i + 1) % ves.length];
	            iw = this.addpoint(w);
	            this.egs.push(new Edge(iv, iw, tag, usermark));
	            iv = iw;
	        }
	    }
	    remove_edges(egs) {
	        egs = egs.concat();
	        lstool.sort(egs);
	        var i;
	        for (i = egs.length - 1; i >= 0; i--) {
	            this.egs.splice(egs[i], 1);
	        }
	    }
	    addpath(ves, tag = -1, usermark = -1) {
	        var i;
	        var v, w;
	        var iv, iw;
	        v = ves[0];
	        iv = this.addpoint(v);
	        var res = [];
	        var eg;
	        for (i = 0; i < ves.length - 1; i++) {
	            w = ves[i + 1];
	            iw = this.addpoint(w);
	            eg = new Edge(iv, iw, tag, usermark);
	            this.egs.push(eg);
	            res.push(eg);
	            iv = iw;
	        }
	        return res;
	    }
	    addsegment(v, w, tag = -1, usermark = -1) {
	        var iv, iw;
	        iv = this.addpoint(v);
	        iw = this.addpoint(w);
	        var res = new Edge(iv, iw, tag, usermark);
	        this.egs.push(res);
	        return res;
	    }
	    addpoint(v) {
	        var j;
	        var found_same = false;
	        for (j = 0; j < this.ves.length; j++) {
	            if (this.ves[j].nearequals(v, CalcConst.dis_err)) {
	                found_same = true;
	                break;
	            }
	        }
	        if (found_same) {
	            return j;
	        }
	        else {
	            this.ves.push(v);
	            return this.ves.length - 1;
	        }
	    }
	    simplify_combinable(dis_err = CalcConst.dis_err) {
	        if (!this.calc_ready)
	            this.build_calc();
	        var i, j;
	        var v0, v1, v2, v3;
	        var b0, b1, b2;
	        var vi0, vi1;
	        var vegs = [];
	        for (i = 0; i < this.ves.length; i++) {
	            vegs.length = 0;
	            for (j = 0; j < this.egs.length; j++) {
	                b0 = this.egs[j];
	                if ((b0.v - i) * (b0.w - i) == 0) {
	                    vegs.push(j);
	                }
	            }
	            if (vegs.length != 2)
	                continue;
	            b0 = this.egs[vegs[0]];
	            b1 = this.egs[vegs[1]];
	            v0 = this.ves[b0.v];
	            v1 = this.ves[b0.w];
	            v2 = this.ves[b1.v];
	            v3 = this.ves[b1.w];
	            var angular_condition = Math.abs(b0.calc_n.dot(b1.calc_n)) > 1 - CalcConst.dot_err;
	            var distance_condition = Math.abs(b0.calc_n.cross(this.normal).dot(this.ves[i].sub(b1.calc_o))) * 2 < dis_err;
	            if (!angular_condition && !distance_condition)
	                continue;
	            this.egs.splice(vegs[1], 1);
	            this.egs.splice(vegs[0], 1);
	            vi0 = (b0.v != i) ? b0.v : b0.w;
	            vi1 = (b1.v != i) ? b1.v : b1.w;
	            b2 = b0.clone();
	            b2.v = vi0;
	            b2.w = vi1;
	            b2.build_calc(this.ves);
	            this.egs.push(b2);
	        }
	    }
	    simplify_ves_replace_duplicated(dis_err = CalcConst.dis_err) {
	        var i, j;
	        var b0;
	        var v0;
	        var ves_mapping = new Array();
	        //替换重复点
	        ves_mapping.length = this.ves.length;
	        for (i = 0; i < this.ves.length; i++) {
	            ves_mapping[i] = i;
	        }
	        for (i = 0; i < this.ves.length; i++) {
	            if (ves_mapping[i] != i)
	                continue;
	            v0 = this.ves[i];
	            for (j = i + 1; j < this.ves.length; j++) {
	                if (v0.nearequals(this.ves[j], dis_err)) {
	                    ves_mapping[j] = i;
	                }
	            }
	        }
	        for (i = 0; i < this.egs.length; i++) { // 整理边信息
	            b0 = this.egs[i];
	            b0.v = ves_mapping[b0.v];
	            b0.w = ves_mapping[b0.w];
	        }
	    }
	    simplify_ves_remove_unuse() {
	        var i;
	        var b0;
	        var ves_mapping = new Array();
	        //删除无用顶点
	        var ves_count = new Array();
	        lstool.init(ves_count, 0, this.ves.length);
	        for (i = 0; i < this.egs.length; i++) { //计算节点引用数
	            b0 = this.egs[i];
	            ves_count[b0.v]++;
	            ves_count[b0.w]++;
	        }
	        var ves_1 = new Array();
	        lstool.init(ves_mapping, -1, this.ves.length);
	        for (i = 0; i < this.ves.length; i++) {
	            if (ves_count[i] == 0)
	                continue;
	            ves_mapping[i] = ves_1.length;
	            ves_1.push(this.ves[i]);
	        }
	        for (i = 0; i < this.egs.length; i++) { // 重整边的引用信息
	            b0 = this.egs[i];
	            b0.v = ves_mapping[b0.v];
	            b0.w = ves_mapping[b0.w];
	        }
	        this.ves = ves_1;
	    }
	    SegmentCrossSegment(p, p0, p1, q, q0, q1, up, tolerance = +CalcConst.dis_err) {
	        var min_r = (p.calc_r + q.calc_r);
	        if (p.calc_o.sub(q.calc_o).lengthSq > min_r * min_r + tolerance)
	            return null;
	        var v0 = p1.sub(p0);
	        var dir0 = p.calc_n;
	        var v1 = q1.sub(q0);
	        var dir1 = q.calc_n;
	        //var up: float3 = dir1.cross(dir0);
	        var diff = q0.sub(p0);
	        if (Math.abs(diff.dot(up)) > CalcConst.dis_err)
	            return null; //异面
	        var dir1t = dir1.cross(up);
	        var base = dir0.dot(dir1t);
	        if (Math.abs(base) < CalcConst.nearzero)
	            return null; // 同面平衡
	        var plen = diff.dot(dir1t) / base;
	        if (plen < 0 - tolerance || plen > v0.dot(dir0) + tolerance) {
	            return null;
	        }
	        var hit = p0.advance(dir0, plen);
	        var qlen = hit.sub(q0).dot(dir1);
	        if (qlen < -tolerance || qlen > v1.dot(dir1) + tolerance)
	            return null;
	        return hit;
	    }
	    divide_overlaping() {
	        if (!this.calc_ready)
	            this.build_calc();
	        var i, j;
	        var b1;
	        var b00, b01;
	        var v0, v2, v3;
	        for (i = 0; i < this.ves.length; i++) { // 点打断线（针对线之间平行的时候的情况）
	            v0 = this.ves[i];
	            for (j = 0; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                v2 = this.ves[b1.v];
	                v3 = this.ves[b1.w];
	                var min_r = b1.calc_r - CalcConst.dis_err;
	                var diff = v0.sub(b1.calc_o);
	                if (diff.lengthSq > min_r * min_r)
	                    continue;
	                if (Math.abs(diff.dot(b1.calc_n.cross(this.normal))) > CalcConst.dis_err)
	                    continue;
	                b00 = b1.clone();
	                b00.v = b1.v;
	                b00.w = i;
	                b00.build_calc(this.ves);
	                b01 = b1.clone();
	                b01.v = i;
	                b01.w = b1.w;
	                b01.build_calc(this.ves);
	                this.egs.splice(j, 1, b00, b01);
	            }
	        }
	    }
	    divide_crossing() {
	        if (!this.calc_ready)
	            this.build_calc();
	        var i, j;
	        var b0, b1;
	        var b00, b01;
	        var b10, b11;
	        var v0, v1, v2, v3;
	        for (i = 0; i < this.egs.length; i++) { // 线打断线（针对线之间交叉的时候·的情况）
	            b0 = this.egs[i];
	            v0 = this.ves[b0.v];
	            v1 = this.ves[b0.w];
	            if (Math.abs(v0.x - v1.x) <= CalcConst.dis_err && Math.abs(v0.y - v1.y) <= CalcConst.dis_err)
	                continue;
	            for (j = i + 1; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                v2 = this.ves[b1.v];
	                v3 = this.ves[b1.w];
	                if (Math.abs(v2.x - v3.x) <= CalcConst.dis_err && Math.abs(v2.y - v3.y) <= CalcConst.dis_err)
	                    continue;
	                //var hit: float3 = VectorCalc.SegmentCrossSegment(v0, v1, v2, v3, CalcConst.dis_err);
	                var hit = this.SegmentCrossSegment(b0, v0, v1, b1, v2, v3, this.normal, CalcConst.dis_err);
	                if (!hit)
	                    continue;
	                var condi0, condi1;
	                var b0_minr = b0.calc_r - CalcConst.dis_err;
	                var b1_minr = b1.calc_r - CalcConst.dis_err;
	                var hitdot0 = hit.sub(b0.calc_o).dot(b0.calc_n);
	                var hitdot1 = hit.sub(b1.calc_o).dot(b1.calc_n);
	                //div b0
	                condi0 = hitdot0 * hitdot0 < b0_minr * b0_minr;
	                //condi0 = (!v0.nearequals(hit, CalcConst.dis_err) && !v1.nearequals(hit, CalcConst.dis_err));
	                //div b1
	                condi1 = hitdot1 * hitdot1 < b1_minr * b1_minr;
	                //condi1 = (!v2.nearequals(hit, CalcConst.dis_err) && !v3.nearequals(hit, CalcConst.dis_err));
	                if (!condi0 && !condi1)
	                    continue;
	                var index;
	                index = this.addpoint(hit);
	                if (condi0) {
	                    b00 = b0.clone();
	                    b00.v = b0.v;
	                    b00.w = index;
	                    b00.build_calc(this.ves);
	                    b01 = b0.clone();
	                    b01.v = index;
	                    b01.w = b0.w;
	                    b01.build_calc(this.ves);
	                    this.egs[i] = b00;
	                    this.egs.push(b01);
	                }
	                if (condi1) {
	                    b10 = b1.clone();
	                    b10.v = b1.v;
	                    b10.w = index;
	                    b10.build_calc(this.ves);
	                    b11 = b1.clone();
	                    b11.v = index;
	                    b11.w = b1.w;
	                    b11.build_calc(this.ves);
	                    this.egs[j] = b10;
	                    this.egs.push(b11);
	                }
	                if (condi0) {
	                    i--;
	                    break;
	                }
	            }
	        }
	    }
	    delete_empty() {
	        var i;
	        var b0;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            if (b0.v == b0.w) {
	                this.egs.splice(i, 1);
	                i--;
	            }
	        }
	    }
	    find_duplicate() {
	        var res = [];
	        var i, j;
	        var b0, b1;
	        var temp = [];
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            var d = false;
	            temp.length = 0;
	            for (j = i + 1; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                if ((b0.v - b1.v) * (b0.v - b1.w) != 0 || (b0.w - b1.v) * (b0.w - b1.w) != 0)
	                    continue;
	                temp.push(j);
	                d = true;
	            }
	            if (!d)
	                continue;
	            res.push(i);
	            lstool.attach(res, temp);
	        }
	        return res;
	    }
	    delete_duplicate() {
	        var i, j;
	        var b0, b1;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            for (j = i + 1; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                if ((b0.v - b1.v) * (b0.v - b1.w) != 0 || (b0.w - b1.v) * (b0.w - b1.w) != 0)
	                    continue;
	                this.egs.splice(j, 1);
	                j--;
	            }
	        }
	    }
	    delete_noneloop() {
	        var ves_count = new Array();
	        var i;
	        var eg;
	        lstool.init(ves_count, 0, this.ves.length);
	        for (i = 0; i < this.egs.length; i++) {
	            eg = this.egs[i];
	            ves_count[eg.v]++;
	            ves_count[eg.w]++;
	        }
	        var process = true;
	        while (process) {
	            process = false;
	            for (i = 0; i < this.egs.length; i++) {
	                eg = this.egs[i];
	                if (ves_count[eg.v] < 2 || ves_count[eg.w] < 2) {
	                    ves_count[eg.v]--;
	                    ves_count[eg.w]--;
	                    this.egs.splice(i, 1);
	                    i--;
	                    process = true;
	                }
	            }
	        }
	    }
	    AND() {
	        var i, j;
	        var b0, b1;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            var good = false;
	            for (j = i + 1; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                if ((b0.v - b1.v) * (b0.v - b1.w) != 0 || (b0.w - b1.v) * (b0.w - b1.w) != 0)
	                    continue;
	                good = true;
	                this.egs.splice(j, 1);
	                j--;
	            }
	            if (good)
	                continue;
	            this.egs.splice(i, 1);
	            i--;
	        }
	    }
	    OVERLAY() {
	        var i, j;
	        var b0, b1;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            for (j = i + 1; j < this.egs.length; j++) {
	                b1 = this.egs[j];
	                if ((b0.v == b1.v) && (b0.w == b1.w)) {
	                    //1 & 1 = 1;
	                    this.egs.splice(j, 1);
	                    j--;
	                    continue;
	                }
	                if ((b0.v == b1.w) && (b0.w == b1.v)) {
	                    //0 & 1 = 0;
	                    this.egs.splice(j, 1);
	                    j--;
	                    this.egs.splice(i, 1);
	                    i--;
	                    break;
	                }
	            }
	        }
	    }
	}

	class ProcessFindEdgeLoopMax {
	    constructor() {
	        this.structure = null;
	        this.ves = null;
	        this.egs = null;
	        this.egsused = null;
	        this.egsusedbyloops = null;
	        this.paths = null;
	        this.vectorloops = null;
	        this.hierarchy_shape_egs = [];
	    }
	    ProcessFindEdgeLoopMax() {
	    }
	    search_path(egidx) {
	        var res = [-1, -1];
	        var i, j;
	        var eg = this.egs[egidx];
	        for (i = 0; i < this.paths.length; i++) {
	            var path = this.paths[i];
	            for (j = 0; j < path.egs.length; j++) {
	                if (path.egs[j] != egidx)
	                    continue;
	                if (path.indices[j] == eg.v) {
	                    res[0] = i;
	                }
	                else { //path.indices[j+1] == eg.v
	                    res[1] = i;
	                }
	                break;
	            }
	        }
	        return res;
	    }
	    get_egsusedbyloops() {
	        return this.egsusedbyloops.concat();
	    }
	    run(structure, filter = null) {
	        this.structure = structure;
	        if (!this.structure.calc_ready)
	            this.structure.build_calc();
	        this.hierarchy_shape_egs = [];
	        this.ves = structure.ves;
	        this.egs = structure.egs;
	        this.egsused = filter == null ? new Array() : filter.concat();
	        lstool.fill(this.egsused, false, this.egs.length);
	        this.egsusedbyloops = [];
	        lstool.fill(this.egsusedbyloops, false, this.egs.length);
	        this.paths = new Array();
	        this.vectorloops = new Array();
	        var res;
	        var status = true;
	        var i, j;
	        while (true) {
	            this.ProcessBlockEdgeOneWay();
	            res = {};
	            status = this.find_outter_edge(res);
	            if (!status)
	                break;
	            status = this.findLoop(res.edge, res.edge_out);
	            if (!status) {
	                this.egsused[res.edge] = true;
	                continue;
	            }
	            var pathi = this.paths.length - 1;
	            var path = this.paths[pathi];
	            this.egsused[path.egs[0]] = true;
	            if (status) {
	                for (i = 0; i < path.egs.length; i++) {
	                    this.egsused[path.egs[i]] = true;
	                    this.egsusedbyloops[path.egs[i]] = true;
	                }
	            }
	            this.FormatPath(path);
	            {
	                var vl = new Shape();
	                for (j = 0; j < path.indices.length; j++) {
	                    vl.ves.push(this.structure.ves[path.indices[j]].clone());
	                }
	                vl.normal = this.structure.normal;
	                vl.sections.length = 0;
	                vl.sections.push(0);
	                vl.sections.push(vl.ves.length);
	            }
	            this.vectorloops.push(vl);
	            this.hierarchy_shape_egs[pathi] = [];
	            for (i = 0; i < this.egs.length; i++) {
	                if (this.egsused[i])
	                    continue;
	                var eg = this.egs[i];
	                if (vl.ContainPointANGLESUM(this.ves[eg.v]) != 1)
	                    continue;
	                this.hierarchy_shape_egs[pathi].push(i);
	                this.egsused[i] = true;
	            }
	            var vesused = [];
	            lstool.init(vesused, false, this.structure.ves.length);
	            for (i = 0; i < path.indices.length; i++) {
	                vesused[path.indices[i]] = true;
	            }
	            for (i = 0; i < this.structure.egs.length; i++) {
	                eg = this.structure.egs[i];
	                if (!vesused[eg.v] || !vesused[eg.w])
	                    continue;
	                this.egsused[i] = true;
	            }
	        }
	    }
	    ProcessBlockEdgeOneWay() {
	        var ves_count = new Array();
	        var i;
	        var eg;
	        lstool.init(ves_count, 0, this.ves.length);
	        for (i = 0; i < this.egs.length; i++) {
	            if (this.egsused[i])
	                continue;
	            eg = this.egs[i];
	            ves_count[eg.v]++;
	            ves_count[eg.w]++;
	        }
	        var open = true;
	        while (open) {
	            open = false;
	            for (i = 0; i < this.egs.length; i++) {
	                eg = this.egs[i];
	                if (!this.egsused[i] && (ves_count[eg.v] < 2 || ves_count[eg.w] < 2)) {
	                    ves_count[eg.v]--;
	                    ves_count[eg.w]--;
	                    this.egsused[i] = true;
	                    open = true;
	                }
	            }
	        }
	    }
	    FormatPath(path) {
	        var j, k;
	        var tag = this.egs[path.egs[path.egs.length - 1]].tag;
	        if (tag != this.egs[path.egs[0]].tag)
	            return;
	        for (j = 0; j < path.egs.length; j++) {
	            if (tag == this.egs[path.egs[j]].tag)
	                continue;
	            break;
	        }
	        var head = j;
	        if (head >= path.egs.length - 2)
	            return;
	        var nindices = new Array();
	        var negs = new Array();
	        for (k = head; k < path.indices.length; k++) {
	            nindices.push(path.indices[k]);
	            negs.push(path.egs[k]);
	        }
	        for (k = 0; k < head; k++) {
	            nindices.push(path.indices[k]);
	            negs.push(path.egs[k]);
	        }
	        path.egs = negs;
	        path.indices = nindices;
	    }
	    find_outter_edge(out) {
	        var i;
	        var egs = this.structure.egs;
	        var res_egidx = -1;
	        var res_n;
	        for (i = 0; i < egs.length; i++) {
	            if (this.egsused[i] == true)
	                continue;
	            var eg = this.egs[i];
	            var r0 = new Ray(eg.calc_o, eg.calc_n.cross(this.structure.normal));
	            var hitres0 = this.structure.raycastWithFilter(r0, this.egsused);
	            var r1 = r0.clone();
	            r1.dir = r1.dir.negate();
	            var hitres1 = this.structure.raycastWithFilter(r1, this.egsused);
	            if (hitres0 != null && hitres1 != null)
	                continue;
	            if (hitres0 == null && hitres1 == null)
	                continue;
	            res_egidx = i;
	            res_n = (hitres0 == null) ? r0.dir : r1.dir;
	            break;
	        }
	        out.edge = res_egidx;
	        out.edge_out = res_n;
	        return res_egidx != -1;
	    }
	    findLoop(startedge, startout) {
	        var i;
	        var startidx = -1;
	        var headborder = -1;
	        var headfinish = false;
	        var path = new EdgeShape();
	        var b0;
	        var b1;
	        var b0i, b0j;
	        var b0v, b0w;
	        var b0n, b1n;
	        headborder = startedge;
	        b0 = this.egs[headborder];
	        var normal = this.structure.normal;
	        if (b0.calc_n.cross(normal).dot(startout) > 0) {
	            b0i = b0.v;
	            b0j = b0.w;
	            b0n = b0.calc_n;
	        }
	        else {
	            b0i = b0.w;
	            b0j = b0.v;
	            b0n = b0.calc_n.negate();
	        }
	        b0v = this.ves[b0i];
	        b0w = this.ves[b0j];
	        startidx = b0i;
	        path.normal = normal;
	        path.egs.push(startedge);
	        path.indices.push(b0i);
	        path.indices.push(b0j);
	        path.dir = float3.dir(b0v, b0w);
	        while (true) {
	            var bst_b1 = -1;
	            var bst_b1j = -1;
	            var bst_b1n;
	            var bst_angle = +Math.PI * 2;
	            var b1j;
	            var b1w;
	            for (i = 0; i < this.egs.length; i++) {
	                if (this.egsused[i] == true)
	                    continue;
	                if (i == headborder)
	                    continue;
	                b1 = this.egs[i];
	                if (b0j == b1.v) {
	                    b1j = b1.w;
	                    b1n = b1.calc_n;
	                }
	                else if (b0j == b1.w) {
	                    b1j = b1.v;
	                    b1n = b1.calc_n.negate();
	                }
	                else {
	                    continue;
	                }
	                b1w = this.ves[b1j];
	                var angle = VectorCalc.angle(b0n, b1n, path.normal);
	                if (angle < bst_angle) {
	                    bst_b1 = i;
	                    bst_b1j = b1j;
	                    bst_b1n = b1n;
	                    bst_angle = angle;
	                }
	            }
	            if (bst_angle <= -Math.PI * 2 || bst_b1 < 0) {
	                break;
	            }
	            {
	                for (i = 1; i < path.indices.length; i++) {
	                    if (path.indices[i] != bst_b1j)
	                        continue;
	                    path.egs.splice(0, i);
	                    path.indices.splice(0, i);
	                    startidx = path.indices[0];
	                    break;
	                }
	            }
	            path.egs.push(bst_b1);
	            path.indices.push(bst_b1j);
	            if (startidx == bst_b1j) {
	                headfinish = true;
	                path.indices.pop();
	                break;
	            }
	            /*
	            if (this.svgbox) {
	                plotsvg.cycle(this.svgbox, this.ves[bst_b1], 5);
	                //plotsvg.text(this.svgbox, path.indices.length + '', b1w);
	                plotsvg.text(this.svgbox, bst_b1j + '', this.ves[bst_b1]);


	                if (path.indices.length == 3)
	                    plotsvg.cycle(this.svgbox, this.ves[bst_b1], 5,0xff0000);
	            }
	            */
	            headborder = bst_b1;
	            b0 = this.egs[bst_b1];
	            b0i = b0j;
	            b0j = bst_b1j;
	            b0n = bst_b1n;
	            b0v = this.ves[b0i];
	            b0w = this.ves[b0j];
	        }
	        if (path.egs.length <= 2 || path.indices.length <= 2)
	            headfinish = false;
	        if (headfinish) {
	            this.paths.push(path);
	        }
	        return headfinish;
	    }
	}

	class ProcessFindEdgeLoopMin {
	    constructor() {
	        this.structure = null;
	        this.ves = null;
	        this.egs = null;
	        this.egsused = null;
	        this.paths = null;
	        this.vectorloops = null;
	        this.complex_paths = null;
	        this.complex_vectorloops = null;
	        this.failpaths = null;
	        this.use_no_sneak_loop = true;
	        this.use_format = true;
	        this.use_failpaths = false;
	        this.use_manualrun = false;
	        this.egsout = new Array();
	        this.hierarchy_hull_shape = null;
	        this.hierarchy_shape_hull = null;
	        this.hierarchy_shape_shape = null;
	    }
	    run(structure, filter = null) {
	        this.structure = structure;
	        if (!this.structure.calc_ready)
	            this.structure.build_calc();
	        this.ves = structure.ves;
	        this.egs = structure.egs;
	        this.egsused = filter == null ? new Array() : filter.concat();
	        lstool.fill(this.egsused, false, this.egs.length);
	        this.paths = new Array();
	        this.hierarchy_shape_hull = null;
	        this.complex_paths = null;
	        this.failpaths = new Array();
	        this.egsout = new Array();
	        lstool.init(this.egsout, -1, this.egs.length);
	        var res;
	        var i;
	        this.shapemaxfinder = null;
	        this.hulls = [];
	        this.hull_count = 0;
	        this.hull_level_count = 0;
	        this.BlockEdgeOneWay();
	        this.build_outter();
	        if (this.use_manualrun)
	            return;
	        while (true) {
	            res = this.find_outter();
	            if (!res)
	                break;
	            this.find_loop(res.id, res.normal);
	            var refresh_outter = true;
	            for (i = 0; i < this.egsout.length; i++) {
	                if (this.egsused[i])
	                    continue;
	                if (this.egsout[i] <= -1)
	                    continue;
	                refresh_outter = false;
	                break;
	            }
	            if (refresh_outter) {
	                this.BlockEdgeOneWay();
	                this.build_outter();
	            }
	        }
	        if (this.use_format)
	            this.FormatPaths();
	        this.Path2VectorLoops();
	    }
	    NoHeadError(path) {
	        var j;
	        var tail = lstool.last(path.egs);
	        for (j = 0; j < path.egs.length - 1; j++) {
	            if (path.egs[j] != tail)
	                continue;
	            break;
	        }
	        if (j >= path.egs.length - 1)
	            return;
	        path.egs.splice(0, j);
	        path.indices.splice(0, j);
	        path.egs.pop();
	        path.indices.pop();
	    }
	    NoSneakLoop(path) {
	        var j, k;
	        var good = true;
	        for (j = 0; j < path.egs.length; j++) {
	            var good = true;
	            for (k = j + 1; k < path.egs.length; k++) {
	                if (path.egs[j] != path.egs[k])
	                    continue;
	                good = false;
	                break;
	            }
	            if (!good)
	                break;
	        }
	        if (good)
	            return;
	        path.egs.splice(j, k - j + 1);
	        path.indices.splice(j, k - j + 1);
	    }
	    get_usage_filter() {
	        return this.egsused.concat();
	    }
	    build_outter() {
	        var i, j;
	        var plfmax = new ProcessFindEdgeLoopMax();
	        plfmax.run(this.structure, this.egsused);
	        if (!this.shapemaxfinder)
	            this.shapemaxfinder = plfmax;
	        for (i = 0; i < plfmax.paths.length; i++) {
	            var path = plfmax.paths[i];
	            for (j = 0; j < path.egs.length; j++) {
	                var egidx = path.egs[j];
	                this.egsout[egidx] = (path.indices[j] == this.egs[egidx].v) ? 0 : 1;
	            }
	            plfmax.vectorloops[i].CalculateBoxBounds();
	            var shape = new EdgeHull();
	            shape.vectorloop = plfmax.vectorloops[i];
	            shape.path = plfmax.paths[i];
	            //shape.packs = plfmax.path_pack_hierarchy[i];
	            shape.path_index_start = this.paths.length;
	            shape.level = this.hull_level_count;
	            this.hulls.push(shape);
	        }
	        this.hull_level_count++;
	        return plfmax.paths.length > 0;
	    }
	    BlockEdgeOneWay() {
	        var ves_count = new Array();
	        var i;
	        var eg;
	        lstool.init(ves_count, 0, this.ves.length);
	        for (i = 0; i < this.egs.length; i++) {
	            if (this.egsused[i])
	                continue;
	            eg = this.egs[i];
	            ves_count[eg.v]++;
	            ves_count[eg.w]++;
	        }
	        var open = true;
	        while (open) {
	            open = false;
	            for (i = 0; i < this.egs.length; i++) {
	                eg = this.egs[i];
	                if (!this.egsused[i] && (ves_count[eg.v] < 2 || ves_count[eg.w] < 2)) {
	                    ves_count[eg.v]--;
	                    ves_count[eg.w]--;
	                    this.egsused[i] = true;
	                    open = true;
	                }
	            }
	        }
	    }
	    find_outter() {
	        var i;
	        var found = false;
	        for (i = 0; i < this.egsout.length; i++) {
	            if (this.egsused[i] == true)
	                continue;
	            var out = this.egsout[i];
	            if (out <= -1)
	                continue;
	            found = true;
	            break;
	        }
	        if (!found)
	            return null;
	        var res = new Object();
	        res.id = i;
	        res.status = out;
	        res.eg = this.egs[i];
	        var v = this.ves[res.eg.v];
	        var w = this.ves[res.eg.w];
	        if (out == 0) {
	            res.normal = res.eg.calc_n.cross(this.structure.normal);
	            res.v = v;
	            res.w = w;
	        }
	        else {
	            res.normal = res.eg.calc_n.negate().cross(this.structure.normal);
	            res.v = w;
	            res.w = v;
	        }
	        return res;
	    }
	    find_loop(startedge, startout) {
	        var i;
	        var startidx0 = -1;
	        var headborder = -1;
	        var headok = true;
	        var headfinish = false;
	        var path = new EdgeShape();
	        var b0;
	        var b0i, b0j;
	        var b0v, b0w, b0n;
	        headborder = startedge;
	        b0 = this.egs[headborder];
	        var normal = this.structure.normal;
	        if (b0.calc_n.cross(normal).dot(startout) > 0) {
	            b0i = b0.v;
	            b0j = b0.w;
	            b0n = b0.calc_n;
	        }
	        else {
	            b0i = b0.w;
	            b0j = b0.v;
	            b0n = b0.calc_n.negate();
	        }
	        b0v = this.ves[b0i];
	        b0w = this.ves[b0j];
	        startidx0 = b0i;
	        path.normal = normal;
	        path.egs.push(startedge);
	        path.indices.push(b0i);
	        path.indices.push(b0j);
	        path.dir = float3.dir(b0v, b0w);
	        while (true) {
	            headok = true;
	            var bst_b1 = -1;
	            var bst_b1j = -1;
	            var bst_b1n;
	            var bst_angle = -Math.PI * 2;
	            var b1;
	            var b1j;
	            var b1w;
	            var b1n;
	            for (i = 0; i < this.egs.length; i++) { //寻找下一个head
	                if (this.egsused[i] == true)
	                    continue;
	                if (i == headborder)
	                    continue;
	                b1 = this.egs[i];
	                if (b0j == b1.v) {
	                    b1j = b1.w;
	                    b1n = b1.calc_n;
	                }
	                else if (b0j == b1.w) {
	                    b1j = b1.v;
	                    b1n = b1.calc_n.negate();
	                }
	                else {
	                    continue;
	                }
	                b1w = this.ves[b1j];
	                var angle = VectorCalc.angle(b0n, b1n, path.normal);
	                if (angle > bst_angle) {
	                    bst_b1 = i;
	                    bst_b1j = b1j;
	                    bst_b1n = b1n;
	                    bst_angle = angle;
	                }
	            }
	            if (bst_angle >= Math.PI * 2 || bst_b1 < 0) {
	                headok = false;
	                break;
	            }
	            for (i = 1; i < path.egs.length; i++) {
	                // do not let the path form up a looping that with out re-entering the first edge
	                if (path.egs[i] != bst_b1)
	                    continue;
	                if (path.indices[i + 0] != b0j || path.indices[i + 1] != bst_b1j)
	                    continue;
	                headok = false;
	                break;
	            }
	            if (headok == false)
	                break;
	            path.egs.push(bst_b1);
	            path.indices.push(bst_b1j);
	            if (startidx0 == bst_b1j) {
	                headfinish = true;
	                path.indices.pop();
	                break;
	            }
	            headborder = bst_b1;
	            b0 = this.egs[bst_b1];
	            b0i = b0j;
	            b0j = bst_b1j;
	            b0n = bst_b1n;
	            b0v = this.ves[b0i];
	            b0w = this.ves[b0j];
	        }
	        if (headfinish) {
	            this.paths.push(path);
	        }
	        else {
	            if (this.use_failpaths)
	                this.failpaths.push(path);
	        }
	        this.egsused[startedge] = true;
	        if (headfinish) {
	            this.NoHeadError(path);
	            if (this.use_no_sneak_loop)
	                this.NoSneakLoop(path);
	            for (i = 0; i < path.indices.length; i++) {
	                var egidx = path.egs[i];
	                var eg = this.egs[egidx];
	                if (this.egsout[egidx] < 0) {
	                    this.egsout[egidx] = (path.indices[i] == eg.v) ? 1 : 0;
	                }
	                else {
	                    this.egsused[egidx] = true;
	                }
	            }
	        }
	        return headfinish;
	    }
	    FormatPaths() {
	        var i, j, k;
	        for (i = 0; i < this.paths.length; i++) {
	            var path = this.paths[i];
	            if (path.egs.length == 0)
	                continue;
	            var tag = this.egs[path.egs[path.egs.length - 1]].tag;
	            if (tag != this.egs[path.egs[0]].tag)
	                continue;
	            for (j = 0; j < path.indices.length; j++) {
	                if (tag == this.egs[path.egs[j]].tag)
	                    continue;
	                break;
	            }
	            if (j >= path.egs.length - 2)
	                continue;
	            var nindices = new Array();
	            var negs = new Array();
	            for (k = j; k < path.indices.length; k++) {
	                nindices.push(path.indices[k]);
	                negs.push(path.egs[k]);
	            }
	            for (k = 0; k < j; k++) {
	                nindices.push(path.indices[k]);
	                negs.push(path.egs[k]);
	            }
	            path.egs = negs;
	            path.indices = nindices;
	        }
	    }
	    Path2VectorLoops() {
	        var i, j;
	        var res = new Array();
	        for (i = 0; i < this.paths.length; i++) {
	            var path = this.paths[i];
	            var vl;
	            vl = new Shape();
	            for (j = 0; j < path.indices.length; j++) {
	                vl.ves.push(this.structure.ves[path.indices[j]].clone());
	            }
	            vl.normal = this.structure.normal.clone();
	            vl.sections.length = 0;
	            vl.sections.push(0);
	            vl.sections.push(vl.ves.length);
	            res.push(vl);
	        }
	        this.vectorloops = res;
	    }
	    PathComplex2VectorLoop(path) {
	        var vl = new Shape();
	        var i;
	        for (i = 0; i < path.indices.length; i++) {
	            vl.ves.push(this.structure.ves[path.indices[i]].clone());
	        }
	        vl.sections = path.sections.concat();
	        vl.normal = this.structure.normal.clone();
	        return vl;
	    }
	    build_hierarchy() {
	        this.hierarchy_shape_hull = [];
	        this.hierarchy_hull_shape = [];
	        this.hierarchy_shape_shape = [];
	        var i, j, k;
	        for (j = 0; j < this.hulls.length; j++) {
	            this.hierarchy_hull_shape.push([]);
	        }
	        var paths_used = [];
	        for (i = 0; i < this.hulls.length; i++) {
	            var head_level = this.hulls[i].level;
	            var head_path_index = this.hulls[i].path_index_start;
	            var end_path_index;
	            var next_level_shell;
	            var next_level_shell_end;
	            var shell;
	            var subshell;
	            shell = this.hulls[i];
	            next_level_shell = this.hulls.length;
	            for (j = i + 1; j < this.hulls.length; j++) {
	                subshell = this.hulls[j];
	                if (subshell.level <= head_level)
	                    continue;
	                next_level_shell = j;
	                break;
	            }
	            next_level_shell_end = this.hulls.length;
	            for (j = next_level_shell; j < this.hulls.length; j++) {
	                subshell = this.hulls[j];
	                if (subshell.level <= this.hulls[next_level_shell].level)
	                    continue;
	                next_level_shell_end = j;
	                break;
	            }
	            end_path_index = this.paths.length;
	            if (next_level_shell < this.hulls.length)
	                end_path_index = this.hulls[next_level_shell].path_index_start;
	            var subpaths = [];
	            this.hierarchy_hull_shape[i] = subpaths;
	            for (k = head_path_index; k < end_path_index; k++) {
	                if (paths_used[k])
	                    continue;
	                if (shell.vectorloop.ContainPointANGLESUM(this.vectorloops[k].ves[0]) == 0)
	                    continue;
	                subpaths.push(k);
	                paths_used[k] = true;
	            }
	            for (j = 0; j < subpaths.length; j++) {
	                var vl = this.vectorloops[subpaths[j]];
	                var path_shells = [];
	                for (k = next_level_shell; k < next_level_shell_end; k++) {
	                    subshell = this.hulls[k];
	                    if (vl.ContainPointANGLESUM(subshell.vectorloop.ves[0]) == 0)
	                        continue;
	                    path_shells.push(k);
	                }
	                this.hierarchy_shape_hull[subpaths[j]] = path_shells;
	            }
	        }
	        for (i = 0; i < this.paths.length; i++) {
	            var subpaths = [];
	            var relations = this.hierarchy_shape_hull[i];
	            for (j = 0; j < relations.length; j++) {
	                lstool.attach(subpaths, this.hierarchy_hull_shape[relations[j]]);
	            }
	            this.hierarchy_shape_shape.push(subpaths);
	        }
	    }
	    build_complex() {
	        if (this.hierarchy_shape_hull == null || this.hierarchy_shape_hull.length == 0)
	            this.build_hierarchy();
	        this.complex_paths = [];
	        this.complex_vectorloops = [];
	        var i, j;
	        var p0, p1;
	        var shape, vl1;
	        for (i = 0; i < this.paths.length; i++) {
	            p0 = this.paths[i];
	            shape = this.vectorloops[i];
	            var pathc = new EdgeShape();
	            pathc.egs = p0.egs.concat();
	            pathc.indices = p0.indices.concat();
	            pathc.sections.push(0, p0.egs.length);
	            pathc.normal = p0.normal.clone();
	            var shapec = shape.clone();
	            var subpaths = this.hierarchy_shape_shape[i];
	            for (j = 0; j < subpaths.length; j++) {
	                var subpath_index = subpaths[j];
	                p1 = this.paths[subpath_index];
	                vl1 = this.vectorloops[subpath_index];
	                lstool.attach(pathc.indices, p1.indices.concat().reverse());
	                lstool.attach(pathc.egs, p1.egs.concat().reverse());
	                pathc.sections.push(pathc.egs.length);
	                lstool.attach(shapec.ves, vl1.ves.concat().reverse());
	                shapec.sections.push(shapec.ves.length);
	            }
	            this.complex_paths.push(pathc);
	            this.complex_vectorloops.push(shapec);
	        }
	    }
	    search_edge_path_relation(egidx) {
	        if (this.complex_paths == null)
	            this.build_complex();
	        var res = [-1, -1];
	        var i, j, k;
	        var eg = this.structure.egs[egidx];
	        for (i = 0; i < this.complex_paths.length; i++) {
	            var path = this.complex_paths[i];
	            var found = false;
	            for (j = 0; j < path.sections.length - 1; j++) {
	                var es0 = path.sections[j];
	                var es1 = path.sections[j + 1];
	                for (k = es0; k < es1; k++) {
	                    if (path.egs[k] != egidx)
	                        continue;
	                    var flip = j > 0;
	                    if (path.indices[k] != eg.v) {
	                        flip = !flip;
	                    }
	                    if (!flip) {
	                        res[0] = i;
	                    }
	                    else {
	                        res[1] = i;
	                    }
	                    found = true;
	                    break;
	                }
	                if (found)
	                    break;
	            }
	        }
	        return res;
	    }
	}

	class ProcessFindContinueSegments {
	    constructor() {
	        this.structure = null;
	        this.paths = null;
	        this.use_continues_poly = false;
	    }
	    run(structure, filter = null, radius = 5 * CalcConst.DEGREES_TO_RADIANS) {
	        this.structure = structure;
	        this.paths = new Array();
	        var i;
	        var j;
	        var egs = structure.egs;
	        var ves = structure.ves;
	        var eg, eg1;
	        var v;
	        var w;
	        var dir;
	        var mask = filter != null ? filter.concat() : [];
	        lstool.fill(mask, false, egs.length);
	        for (i = 0; i < egs.length; i++) {
	            if (mask[i])
	                continue;
	            eg = egs[i];
	            v = ves[eg.v];
	            w = ves[eg.w];
	            var headvi = eg.v;
	            var headwi = eg.w;
	            var headv = eg;
	            var headw = eg;
	            var headdirv = float3.dir(v, w);
	            var headdirw = float3.dir(v, w);
	            var path = new EdgeShape();
	            path.egs.push(i);
	            path.indices.push(headvi, headwi);
	            mask[i] = true;
	            var process;
	            var tag_continue0 = false;
	            var tag_continue1 = false;
	            var dotvalue0;
	            var dotvalue1;
	            process = true;
	            while (process) {
	                process = false;
	                for (j = 0; j < egs.length; j++) {
	                    if (mask[j])
	                        continue;
	                    eg1 = egs[j];
	                    if ((headvi - eg1.v) * (headvi - eg1.w) != 0)
	                        continue;
	                    dir = eg1.calc_n;
	                    tag_continue0 = ((headv.tag - eg1.tag) | (headv.structuretag - eg1.structuretag)) == 0;
	                    dotvalue0 = Math.abs(headdirv.dot(dir));
	                    if (dotvalue0 > Math.cos(radius) || tag_continue0) {
	                        headvi = headvi == eg1.v ? eg1.w : eg1.v;
	                        path.egs.unshift(j);
	                        path.indices.unshift(headvi);
	                        path.is_poly = path.is_poly || dotvalue0 < 1 - CalcConst.nearzero;
	                        headdirv = dir;
	                        headv = eg1;
	                        process = true;
	                        mask[j] = true;
	                    }
	                }
	            }
	            process = true;
	            while (process) {
	                process = false;
	                for (j = 0; j < egs.length; j++) {
	                    if (mask[j])
	                        continue;
	                    eg1 = egs[j];
	                    if ((headwi - eg1.v) * (headwi - eg1.w) != 0)
	                        continue;
	                    dir = eg1.calc_n;
	                    tag_continue1 = headw.tag == eg1.tag && headw.structuretag == eg1.structuretag;
	                    dotvalue1 = Math.abs(headdirw.dot(dir));
	                    if (dotvalue1 > Math.cos(radius) || tag_continue1) {
	                        headwi = headwi == eg1.v ? eg1.w : eg1.v;
	                        path.egs.push(j);
	                        path.indices.push(headwi);
	                        path.is_poly = path.is_poly || dotvalue1 < 1 - CalcConst.nearzero;
	                        headdirw = dir;
	                        headw = eg1;
	                        process = true;
	                        mask[j] = true;
	                    }
	                }
	            }
	            this.paths.push(path);
	        }
	    }
	}

	class GenEdge {
	    constructor(edgeclass) {
	        this.tag = -1;
	        //public structuretag: number = -1;
	        this.usermark = 0;
	        this.reftag = -1;
	        this.color = 0;
	        this.selected = false;
	        this.edgeclass = edgeclass;
	    }
	    clone() {
	        return null;
	    }
	}

	class PolyCollideRes {
	    constructor() {
	        this.points = new Array();
	    }
	}

	let Poly = /** @class */ (() => {
	    class Poly extends GenEdge {
	        constructor(polyclass = Poly.edgetype) {
	            super(polyclass);
	            this.nodes = new Array();
	            this.out = new Array();
	            this.boxbound = new BoxBound();
	        }
	        equals(value) {
	            if (!value || !(value instanceof Poly))
	                return false;
	            if (this.v != value.v || this.w != value.w || this.usermark != value.usermark || this.nodes.length != value.nodes.length)
	                return false;
	            var i;
	            for (i = 0; i < this.nodes.length; i++) {
	                if (!this.nodes[i].equals(value.nodes[i]))
	                    return false;
	            }
	            return true;
	        }
	        clone() {
	            var res = new Poly();
	            res.v = this.v;
	            res.w = this.w;
	            var i;
	            for (i = 0; i < this.nodes.length; i++) {
	                res.nodes.push(this.nodes[i].clone());
	            }
	            res.usermark = this.usermark;
	            return res;
	        }
	        ContainPoint(pos, range) {
	            if (!this.boxbound.ContainPoint(pos))
	                return false;
	            var i;
	            for (i = 0; i < this.out.length - 1; i++) {
	                if (!VectorCalc.segmentContainPointF(this.out[i + 0], this.out[i + 1], pos, range))
	                    continue;
	                return true;
	            }
	            return false;
	        }
	        CollidePoly(poly) {
	            if (!this.boxbound.intersectBounds(poly.boxbound))
	                return null;
	            var res = new PolyCollideRes();
	            var i, j;
	            var v0, v1, v2, v3;
	            for (i = 0; i < this.out.length - 1; i++) {
	                v0 = this.out[i + 0];
	                v1 = this.out[i + 1];
	                for (j = 0; j < poly.out.length - 1; j++) {
	                    v2 = this.out[j + 0];
	                    v3 = this.out[j + 1];
	                    var hit = VectorCalc.SegmentCrossSegment(v0, v1, v2, v3);
	                    if (hit == null)
	                        continue;
	                    res.points.push(hit);
	                }
	            }
	            return res;
	        }
	        CollideSegment(a, b) {
	            var bound = BoxBound.CreateWithAB(a, b);
	            if (!this.boxbound.intersectBounds(bound))
	                return null;
	            var res = new PolyCollideRes();
	            var i;
	            var v0, v1;
	            for (i = 0; i < this.out.length - 1; i++) {
	                v0 = this.out[i + 0];
	                v1 = this.out[i + 1];
	                var hit = VectorCalc.SegmentCrossSegment(v0, v1, a, b);
	                if (hit == null)
	                    continue;
	                res.points.push(hit);
	            }
	            return res;
	        }
	        Splite(ves, points, range) {
	            var res = new Array();
	            var i, j;
	            var pointstravel = new Array();
	            var outtravel = new Array();
	            lstool.init(pointstravel, -1, points.length);
	            lstool.init(outtravel, -1, this.out.length);
	            var head = this.out[0];
	            var next;
	            var travel = 0;
	            for (i = 0; i < this.out.length - 1; i++) {
	                next = this.out[i + 1];
	                travel += next.sub(head).length;
	                outtravel[i] = travel;
	                head = next;
	                for (j = 0; j < points.length; j++) {
	                    if (!VectorCalc.segmentContainPointF(this.out[i + 0], this.out[i + 1], points[j], range))
	                        continue;
	                    pointstravel[j] = travel + points[j].sub(head).length;
	                }
	            }
	            var nout = new Array();
	            var nouttravel = new Array();
	            var noutsection = new Array();
	            lstool.attach(nout, this.out);
	            lstool.attach(nout, points);
	            lstool.attach(nouttravel, outtravel);
	            lstool.attach(nouttravel, pointstravel);
	            lstool.init(noutsection, false, this.out.length);
	            lstool.init(noutsection, true, points.length);
	            var sortmap = lstool.sortindices(nouttravel);
	            var sectionhead = 0;
	            var sectionnext;
	            var iv = poly.v;
	            var iw;
	            while (sectionhead < sortmap.length - 1) {
	                for (i = sectionhead; i < sortmap.length; i++) {
	                    var id = sortmap[i];
	                    if (!noutsection[id])
	                        continue;
	                    sectionnext = i;
	                    break;
	                }
	                if (i >= sortmap.length) {
	                    sectionnext = sortmap.length - 1;
	                }
	                iw = ves.length;
	                ves.push(nout[sortmap[sectionnext]].clone());
	                var poly = new Poly();
	                poly.v = iv;
	                poly.w = iw;
	                poly.tag = this.tag;
	                poly.usermark = this.usermark;
	                for (i = 1; i < sectionnext; i++) {
	                    poly.nodes.push(nout[sortmap[i]].clone());
	                }
	                res.push(poly);
	                sectionhead = sectionnext;
	            }
	            return res;
	        }
	        Build(ves) {
	            if (this.v == this.w)
	                return;
	            this.out.length = 0;
	            this.out.push(ves[this.v]);
	            lstool.attach(this.out, this.nodes);
	            this.out.push(ves[this.w]);
	            var ans = new BoxBound();
	            if (this.out.length > 0) {
	                var min = new float3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	                var max = new float3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	                var i;
	                for (i = 0; i < this.out.length; i++) {
	                    var p = this.out[i];
	                    max.x = Math.max(p.x, max.x);
	                    max.y = Math.max(p.y, max.y);
	                    max.z = Math.max(p.z, max.z);
	                    min.x = Math.min(p.x, min.x);
	                    min.y = Math.min(p.y, min.y);
	                    min.z = Math.min(p.z, min.z);
	                }
	                ans.max = max;
	                ans.min = min;
	                ans.size = max.sub(min);
	                ans.center = float3.lerp(min, max, 0.5);
	            }
	            this.boxbound = ans;
	        }
	        getNode(pos, dis) {
	            return -1;
	        }
	        searchRayHit(ray, dis) {
	            return null;
	        }
	    }
	    Poly.edgetype = "Poly";
	    return Poly;
	})();

	class ArcCurvesPoly extends Poly {
	    constructor() {
	        super('ArcCurvesPoly');
	    }
	    clone() {
	        var res = new ArcCurvesPoly();
	        res.v = this.v;
	        res.w = this.w;
	        var i;
	        for (i = 0; i < this.nodes.length; i++) {
	            res.nodes.push(this.nodes[i].clone());
	        }
	        res.usermark = this.usermark;
	        return res;
	    }
	    Build(ves) {
	        if (this.v == this.w)
	            return;
	        this.out = ArcPoint3ToSegmentArray(ves[this.v], this.nodes[0], ves[this.w], 5 * CalcConst.DEGREES_TO_RADIANS, CalcConst.min_curve_node_dis);
	        var vl = new Shape();
	        var pos;
	        var i;
	        for (i = 0; i < this.out.length; i++) {
	            pos = this.out[i];
	            vl.ves.push(pos);
	        }
	        vl.CalculateBoxBounds();
	        this.boxbound = vl.boxbound;
	    }
	    getNode(pos, dis) {
	        var i;
	        var bst_node = -1;
	        var bst_dis = dis;
	        var dis;
	        var node;
	        for (i = 0; i < this.nodes.length; i++) {
	            node = this.nodes[i];
	            dis = pos.sub(node).length;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_node = i;
	            }
	        }
	        return bst_node;
	    }
	    searchRayHit(ray, dis) {
	        var i;
	        var bst_node;
	        var bst_dis = dis;
	        var dis;
	        var node;
	        for (i = 0; i < this.out.length - 1; i++) {
	            node = VectorCalc.rayCrossSegment(ray, this.out[i], this.out[i + 1]);
	            dis = ray.pos.sub(node).length;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_node = node;
	            }
	        }
	        return bst_node;
	    }
	}

	class float2 {
	    constructor(x = 0, y = 0) {
	        this.x = x;
	        this.y = y;
	    }
	    equals(value) {
	        return this.x == value.x && this.y == value.y;
	    }
	    clone() {
	        return new float2(this.x, this.y);
	    }
	    toString() {
	        return "float2(" + this.x + "," + this.y + ")";
	    }
	    static fromString(string) {
	        var i;
	        var j;
	        var v = new float2();
	        i = string.indexOf("(") + 1;
	        j = string.indexOf(",", i);
	        v.x = Number(string.substring(i, j));
	        i = j + 1;
	        j = string.indexOf(")", i);
	        v.y = Number(string.substring(i, j));
	        return v;
	    }
	}

	class BezierCurves {
	    /**
	        *  EXP
	        */
	    static rayCastT(bezier, ray, speed = 1, epsilon = 0.1, maxstep = 100, info = null) {
	        var t;
	        var l;
	        var pos0 = ray.pos.clone();
	        var pos = ray.pos.clone();
	        var i, k;
	        var dL;
	        var dT;
	        var P1 = bezier[0];
	        var P2 = bezier[2];
	        var P = bezier[1];
	        var patchsize = 10;
	        var numstep = 0;
	        var error = Number.MAX_VALUE;
	        var error1 = Number.MAX_VALUE;
	        l = 0;
	        while (numstep < maxstep) {
	            t = float3.lineCord(bezier[0], bezier[2], pos);
	            t = MathCalc.Clamp(t);
	            t = BezierCurves.findPositionT(bezier, pos0, t, 1, 0.1, 100);
	            t = MathCalc.Clamp(t);
	            //t=0.5/**/
	            pos0 = pos0.add(ray.dir.scale(pos0.sub(BezierCurves.point(bezier, 2, t)).length * 0.5));
	            pos = pos0.clone();
	            l = 0;
	            for (i = numstep; i < maxstep; i += patchsize) {
	                for (k = 0; k < patchsize; k++) {
	                    pos = ray.dir.scale(l).add(pos0);
	                    dT = -1 * BezierCurves.derivativeT(pos, P1, P2, P, t) / BezierCurves.derivative2T(pos, P1, P2, P, t);
	                    dL = -1 * ((pos.x - P1.x * (1 - t) * (1 - t) - P2.x * t * t - 2 * t * (1 - t) * P.x) * ray.dir.x +
	                        (pos.y - P1.y * (1 - t) * (1 - t) - P2.y * t * t - 2 * t * (1 - t) * P.y) * ray.dir.y +
	                        (pos.z - P1.z * (1 - t) * (1 - t) - P2.z * t * t - 2 * t * (1 - t) * P.z) * ray.dir.z)
	                        / (ray.dir.x * ray.dir.x + ray.dir.y * ray.dir.y + ray.dir.z * ray.dir.z);
	                    t += dT * speed;
	                    l += dL * speed;
	                    numstep++;
	                }
	                if (pos.sub(ray.pos).dot(ray.dir) < 0)
	                    break;
	                if (i > maxstep)
	                    break;
	                error = pos.sub(BezierCurves.point(bezier, 2, t)).length;
	                if (error < epsilon)
	                    break;
	                if (error1 - error < epsilon * epsilon) { // not improving
	                    t = Math.random();
	                    l = 0;
	                }
	                error1 = error;
	            }
	            if (pos.sub(ray.pos).dot(ray.dir) > 0)
	                break;
	        }
	        if (info != null) {
	            info['step'] = numstep;
	            info['error'] = error;
	        }
	        return t;
	    }
	    static findPositionT(bezier, pos, t, speed = 1, epsilon = 0.1, maxstep = 100, info = null) {
	        if (bezier.length < 3)
	            return NaN;
	        var i, k;
	        var dT;
	        var P1 = bezier[0];
	        var P2 = bezier[2];
	        var P = bezier[1];
	        var patchsize = 10;
	        var numpatch = maxstep / patchsize;
	        var error;
	        var error_t = pos.sub(BezierCurves.point(bezier, 2, t)).length;
	        for (i = 0; i < numpatch; i++) {
	            for (k = 0; k < patchsize; k++) {
	                dT = -1 * BezierCurves.derivativeT(pos, P1, P2, P, t) / BezierCurves.derivative2T(pos, P1, P2, P, t);
	                t += dT * speed;
	            }
	            if (i * patchsize > maxstep)
	                break;
	            error = pos.sub(BezierCurves.point(bezier, 2, t)).length;
	            if (error > error_t + epsilon) {
	                t = Math.random();
	            }
	            if (error < epsilon)
	                break;
	        }
	        if (info != null) {
	            info['step'] = (i != numpatch ? i : i - 1) * patchsize + k;
	            info['error'] = error;
	        }
	        return t;
	    }
	    static findt(bezier, pos, epsilon = 0.001) {
	        var P1 = bezier[0];
	        var P2 = bezier[bezier.length - 1];
	        var dir = P2.sub(P1).normal();
	        var t = new float2(0, 1);
	        var r = bezier.length - 1;
	        while (t != null && t.y - t.x > epsilon) {
	            t = BezierCurves.findt_recursion(bezier, r, t, pos, epsilon);
	        }
	        var res;
	        if (t == null)
	            res = NaN;
	        else
	            res = 0.5 * t.x + 0.5 * t.y;
	        return res;
	    }
	    static findt_recursion(bezier, r, t, pos, epsilon) {
	        var a, b, c;
	        var th = 0.5 * t.x + 0.5 * t.y;
	        a = BezierCurves.point(bezier, r, t.x);
	        b = BezierCurves.point(bezier, r, th);
	        c = BezierCurves.point(bezier, r, t.y);
	        var res;
	        if (VectorCalc.dotSegmentDistance(pos, a, b) < VectorCalc.dotSegmentDistance(pos, b, c)) {
	            res = new float2(t.x, th);
	        }
	        else {
	            res = new float2(th, t.y);
	        }
	        return res;
	    }
	    // r = 2 only
	    static approximate(Ct, epsilon = 0.1, maxstep = 2000, speed = 1, info = null) {
	        if (Ct.length < 3)
	            return null;
	        var i, j, k;
	        var dP;
	        var dT;
	        var P1 = Ct[0];
	        var P2 = Ct[Ct.length - 1];
	        var P = float3.lerp(P1, P2, 0.5);
	        var patchsize = 10;
	        var res = new Array();
	        res.push(P1, P, P2);
	        var T;
	        T = new Array();
	        T.length = Ct.length;
	        for (j = 1; j < Ct.length - 1; j++) {
	            T[j] = (j) / (Ct.length - 1);
	        }
	        T[0] = 0;
	        T[T.length - 1] = 1;
	        var t;
	        var numpatch = maxstep / patchsize;
	        for (i = 0; i < numpatch; i++) {
	            for (k = 0; k < patchsize; k++) {
	                dP = new float3();
	                var d1 = new float3();
	                var d2 = new float3();
	                for (j = 1; j < Ct.length - 1; j++) {
	                    t = T[j];
	                    d1 = d1.add(BezierCurves.derivativeP(Ct, j, P, t));
	                    d2 = d2.add(BezierCurves.derivative2P(Ct, j, P, t));
	                }
	                d1 = d1.scale(1 / Ct.length);
	                d2 = d2.scale(1 / Ct.length);
	                dP = dP.add(new float3(-d1.x / d2.x, -d1.y / d2.y, -d1.z / d2.z));
	                P.addby(dP.scale(speed));
	                //P.addby(dP);
	                for (j = 1; j < Ct.length - 1; j++) {
	                    t = T[j];
	                    dT = -1 * BezierCurves.derivativeT(Ct[j], P1, P2, P, t) / BezierCurves.derivative2T(Ct[j], P1, P2, P, t);
	                    T[j] += dT;
	                }
	            }
	            if (i * patchsize > maxstep)
	                break;
	            if (BezierCurves.calculate_error(Ct, P, T) < epsilon)
	                break;
	        }
	        if (info != null) {
	            info['step'] = (i != numpatch ? i : i - 1) * patchsize + k;
	            info['T'] = T;
	            info['error'] = BezierCurves.calculate_error(Ct, P, T);
	        }
	        return res;
	    }
	    static calculate_error(Ct, P, T = null) {
	        var P1 = Ct[0];
	        var P2 = Ct[Ct.length - 1];
	        var i;
	        var res = 0;
	        var t;
	        if (T == null) {
	            T = new Array();
	            for (i = 0; i < Ct.length; i++) {
	                T[i] = (i) / (Ct.length - 1);
	            }
	        }
	        var scale = 1 / Ct.length;
	        for (i = 0; i < Ct.length; i++) {
	            var Cti = Ct[i];
	            t = T[i];
	            res += Math.sqrt(+Math.pow((Cti.x - P1.x * (1 - t) * (1 - t) - P2.x * t * t - 2 * t * (1 - t) * P.x), 2)
	                + Math.pow((Cti.y - P1.y * (1 - t) * (1 - t) - P2.y * t * t - 2 * t * (1 - t) * P.y), 2)
	                + Math.pow((Cti.z - P1.z * (1 - t) * (1 - t) - P2.z * t * t - 2 * t * (1 - t) * P.z), 2)) * scale;
	        }
	        return res;
	    }
	    static derivativeP(Ct, i, P, t) {
	        var P1 = Ct[0];
	        var P2 = Ct[Ct.length - 1];
	        var Cti = Ct[i];
	        var dx = 2 * (Cti.x - P1.x * (1 - t) * (1 - t) - P2.x * t * t - 2 * t * (1 - t) * P.x) * (-t * (1 - t));
	        var dy = 2 * (Cti.y - P1.y * (1 - t) * (1 - t) - P2.y * t * t - 2 * t * (1 - t) * P.y) * (-t * (1 - t));
	        var dz = 2 * (Cti.z - P1.z * (1 - t) * (1 - t) - P2.z * t * t - 2 * t * (1 - t) * P.z) * (-t * (1 - t));
	        return new float3(dx, dy, dz);
	    }
	    static derivative2P(Ct, i, P, t) {
	        var P1 = Ct[0];
	        var P2 = Ct[Ct.length - 1];
	        var Cti = Ct[i];
	        var dx = 2 * (-2 * t * (1 - t)) * (-t * (1 - t));
	        var dy = 2 * (-2 * t * (1 - t)) * (-t * (1 - t));
	        var dz = 2 * (-2 * t * (1 - t)) * (-t * (1 - t));
	        return new float3(dx, dy, dz);
	    }
	    static derivativeT(Ct, P1, P2, P, t) {
	        var dx = 2 * (Ct.x - P1.x * (1 - t) * (1 - t) - P2.x * t * t - 2 * t * (1 - t) * P.x) * (2 * (1 - t) * P1.x - 2 * t * P2.x - 2 * (1 - 2 * t) * P.x);
	        var dy = 2 * (Ct.y - P1.y * (1 - t) * (1 - t) - P2.y * t * t - 2 * t * (1 - t) * P.y) * (2 * (1 - t) * P1.y - 2 * t * P2.y - 2 * (1 - 2 * t) * P.y);
	        var dz = 2 * (Ct.z - P1.z * (1 - t) * (1 - t) - P2.z * t * t - 2 * t * (1 - t) * P.z) * (2 * (1 - t) * P1.z - 2 * t * P2.z - 2 * (1 - 2 * t) * P.z);
	        return dx + dy + dz;
	    }
	    static derivative2T(Ct, P1, P2, P, t) {
	        var dx = 2 * (-P1.x * 2 * (1 - t) * (-1) - P2.x * 2 * t - 2 * (1 - 2 * t) * P.x) * (2 * (1 - t) * P1.x - 2 * t * P2.x - 2 * (1 - 2 * t) * P.x) + 2 * (Ct.x - P1.x * (1 - t) * (1 - t) - P2.x * t * t - 2 * t * (1 - t) * P.x) * (2 * (-1) * P1.x - 2 * P2.x - 2 * (1 - 2) * P.x);
	        var dy = 2 * (-P1.y * 2 * (1 - t) * (-1) - P2.y * 2 * t - 2 * (1 - 2 * t) * P.y) * (2 * (1 - t) * P1.y - 2 * t * P2.y - 2 * (1 - 2 * t) * P.y) + 2 * (Ct.y - P1.y * (1 - t) * (1 - t) - P2.y * t * t - 2 * t * (1 - t) * P.y) * (2 * (-1) * P1.y - 2 * P2.y - 2 * (1 - 2) * P.y);
	        var dz = 2 * (-P1.z * 2 * (1 - t) * (-1) - P2.z * 2 * t - 2 * (1 - 2 * t) * P.z) * (2 * (1 - t) * P1.z - 2 * t * P2.z - 2 * (1 - 2 * t) * P.z) + 2 * (Ct.z - P1.z * (1 - t) * (1 - t) - P2.z * t * t - 2 * t * (1 - t) * P.z) * (2 * (-1) * P1.z - 2 * P2.z - 2 * (1 - 2) * P.z);
	        return dx + dy + dz;
	    }
	    static test_points(time) {
	        var sec = time;
	        var t = (sec % 3) / 3;
	        var p = new Array();
	        p.push(new float3(0, 0), new float3(100, 100), new float3(150, -20), new float3(200, 100));
	        p = float3.ListScale(p, 10);
	        var res = BezierCurves.points(p, 3, t);
	        return res;
	    }
	    static deCasteljauAlgorithm(b, i, r, t) {
	        var res;
	        if (r == 0) {
	            res = b[i];
	        }
	        else {
	            res = BezierCurves.deCasteljauAlgorithm(b, i, r - 1, t).scale(1 - t).add(BezierCurves.deCasteljauAlgorithm(b, i + 1, r - 1, t).scale(t));
	        }
	        return res;
	    }
	    static curves(ves, t_intervel = 0.1, degree_intervel = 5) {
	        var r = ves.length - 1;
	        var res = new Array();
	        var head = new Object();
	        head.t = 0;
	        head.p = BezierCurves.point(ves, r, head.t);
	        var end = new Object();
	        end.t = 1;
	        end.p = BezierCurves.point(ves, r, end.t);
	        head.n = end;
	        end.n = null;
	        BezierCurves.improve_curves_link(ves, r, head, end, degree_intervel * CalcConst.DEGREES_TO_RADIANS);
	        var node = head;
	        var prevnode;
	        while (node.n != null) {
	            prevnode = node;
	            res.push(node.p);
	            node = node.n;
	            prevnode.n = null;
	        }
	        res.push(node.p);
	        return res;
	    }
	    static improve_curves_link(ves, r, a, b, maxradius) {
	        var center = new Object();
	        center.t = a.t * 0.5 + b.t * 0.5;
	        center.p = BezierCurves.point(ves, r, center.t);
	        a.n = center;
	        center.n = b;
	        var radius = Math.acos(center.p.sub(a.p).normal().dot(b.p.sub(center.p).normal()));
	        if (radius > maxradius) {
	            BezierCurves.improve_curves_link(ves, r, a, center, maxradius);
	            BezierCurves.improve_curves_link(ves, r, center, b, maxradius);
	        }
	    }
	    static curvesV2(ves, t_intervel = 0.1, degree_intervel = 5, mindistance_intervel = CalcConst.unit) {
	        var r = ves.length - 1;
	        var res = new Array();
	        var a = new Object();
	        a.t = 0;
	        a.p = BezierCurves.point(ves, r, a.t);
	        var b = new Object();
	        b.t = 0.5;
	        b.p = BezierCurves.point(ves, r, b.t);
	        var c = new Object();
	        c.t = 1;
	        c.p = BezierCurves.point(ves, r, c.t);
	        a.n = b;
	        b.n = c;
	        c.n = null;
	        BezierCurves.improve_curves_linkV2(ves, r, a, b, c, t_intervel, degree_intervel * CalcConst.DEGREES_TO_RADIANS, mindistance_intervel);
	        var node = a;
	        var prevnode;
	        while (node != null) {
	            prevnode = node;
	            res.push(node.p);
	            node = node.n;
	            prevnode.n = null;
	        }
	        return res;
	    }
	    static improve_curves_linkV2(ves, r, a, b, c, t_intervel, degree_intervel, mindistance_intervel) {
	        var radius = Math.acos(b.p.sub(a.p).normal().dot(c.p.sub(b.p).normal()));
	        if (a.p.sub(c.p).lengthSq < mindistance_intervel * mindistance_intervel)
	            return;
	        if (radius <= degree_intervel && Math.abs(a.t - c.t) < t_intervel)
	            return;
	        var b0 = new Object();
	        b0.t = a.t * 2 / 3 + c.t * 1 / 3;
	        b0.p = BezierCurves.point(ves, r, b0.t);
	        var b1 = new Object();
	        b1.t = a.t * 1 / 3 + c.t * 2 / 3;
	        b1.p = BezierCurves.point(ves, r, b1.t);
	        a.n = b0;
	        b0.n = b1;
	        b1.n = c;
	        b.n = null;
	        BezierCurves.improve_curves_linkV2(ves, r, a, b0, b1, t_intervel, degree_intervel, mindistance_intervel);
	        b0 = a;
	        while (b0.n != b1) {
	            b0 = b0.n;
	        }
	        BezierCurves.improve_curves_linkV2(ves, r, b0, b1, c, t_intervel, degree_intervel, mindistance_intervel);
	    }
	    static point(ves, r, t) {
	        var i;
	        var b = new Array();
	        var n = ves.length - 1;
	        for (i = 0; i <= n; i++) {
	            b.push(ves[i]);
	        }
	        var rr;
	        for (rr = 1; rr <= r; rr++) {
	            for (i = 0; i <= n - rr; i++) {
	                b[i] = b[i].scale(1 - t).add(b[i + 1].scale(t));
	            }
	        }
	        return b[0];
	    }
	    static points(ves, r, t) {
	        var i;
	        var bir = new Array();
	        var n = ves.length - 1;
	        var br0 = new Array();
	        for (i = 0; i <= n; i++) {
	            br0.push(ves[i]);
	        }
	        bir.push(br0);
	        var rr;
	        var brp;
	        var br;
	        for (rr = 1; rr <= r; rr++) {
	            br = new Array();
	            for (i = 0; i <= n - rr; i++) {
	                brp = bir[rr - 1];
	                br.push(brp[i].scale(1 - t).add(brp[i + 1].scale(t)));
	            }
	            bir.push(br);
	        }
	        return bir;
	    }
	}

	class BezierCurvesPoly extends Poly {
	    constructor() {
	        super('BezierCurvesPoly');
	    }
	    clone() {
	        var res = new BezierCurvesPoly();
	        res.v = this.v;
	        res.w = this.w;
	        var i;
	        for (i = 0; i < this.nodes.length; i++) {
	            res.nodes.push(this.nodes[i].clone());
	        }
	        res.usermark = this.usermark;
	        return res;
	    }
	    Build(ves) {
	        if (this.v == this.w)
	            return;
	        var p = new Array();
	        p.push(ves[this.v]);
	        lstool.attach(p, this.nodes);
	        p.push(ves[this.w]);
	        this.out = BezierCurves.curvesV2(p);
	        var vl = new Shape();
	        var pos;
	        var i;
	        for (i = 0; i < this.out.length; i++) {
	            pos = this.out[i];
	            vl.ves.push(pos);
	        }
	        vl.CalculateBoxBounds();
	        this.boxbound = vl.boxbound;
	    }
	    getNode(pos, dis) {
	        var i;
	        var bst_node = -1;
	        var bst_dis = dis;
	        var dis;
	        var node;
	        for (i = 0; i < this.nodes.length; i++) {
	            node = this.nodes[i];
	            dis = pos.sub(node).length;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_node = i;
	            }
	        }
	        return bst_node;
	    }
	    searchRayHit(ray, dis) {
	        var i;
	        var bst_node;
	        var bst_dis = dis;
	        var dis;
	        var node;
	        for (i = 0; i < this.out.length - 1; i++) {
	            node = VectorCalc.rayCrossSegment(ray, this.out[i], this.out[i + 1]);
	            dis = ray.pos.sub(node).length;
	            if (dis < bst_dis) {
	                bst_dis = dis;
	                bst_node = node;
	            }
	        }
	        return bst_node;
	    }
	}

	class GenedgeDataSearchRes {
	    constructor() {
	        this.edge = null;
	        this.edgeidx = null;
	        this.edgetype = null; // segment,poly
	        this.distance = Number.MAX_VALUE;
	        this.nearestpos = null;
	    }
	}

	class IEdgeLocation {
	    constructor() {
	    }
	}

	let Segment = /** @class */ (() => {
	    class Segment extends GenEdge {
	        constructor(v = 0, w = 0) {
	            super(Segment.edgetype);
	            this.v = v;
	            this.w = w;
	        }
	        equals(value) {
	            if (!value || !(value instanceof Segment))
	                return false;
	            return this.v == value.v && this.w == value.w && this.usermark == value.usermark;
	        }
	        clone() {
	            var res = new Segment(this.v, this.w);
	            res.tag = this.tag;
	            res.usermark = this.usermark;
	            return res;
	        }
	    }
	    Segment.edgetype = "Segment";
	    return Segment;
	})();

	class GenedgeStructure {
	    constructor() {
	        this.normal = new float3(0, 0, 1);
	        this.ves = new Array();
	        this.egs = new Array();
	        this.boxbound = new BoxBound();
	        this.out = new EdgeStructure();
	        this.structuretag = -1;
	        this.interfaces = new Map();
	        this.interfaces[alignableInterfaceTag] = true;
	    }
	    Disorder() {
	        for (var i = 0; i < this.egs.length; i++) {
	            var eg = this.egs[i];
	            var swap = eg.v;
	            eg.v = eg.w;
	            eg.w = swap;
	        }
	        //this.egs = lstool.disorder(this.egs);
	    }
	    tojson(p = CalcConst.precision) {
	        var i;
	        var ans = '';
	        ans += '{';
	        ans += "name:'GenedgeData',";
	        ans += "normal:'" + this.normal.toPreciseString(p) + "',";
	        ans += 'ves:';
	        ans += float3.ListToString(this.ves, p);
	        ans += ',';
	        ans += 'egs:[';
	        for (i = 0; i < this.egs.length; i++) {
	            var ieg = this.egs[i];
	            if (ieg instanceof Segment) {
	                var sg = ieg;
	                var sgs = '';
	                sgs += '{';
	                sgs += 'edgeclass:' + "'" + sg.edgeclass + "',";
	                sgs += 'v:' + sg.v + ',';
	                sgs += 'w:' + sg.w + ',';
	                sgs += 'tag:' + sg.tag + ',';
	                sgs += 'usermark:' + sg.usermark + ',';
	                sgs += '},';
	                ans += sgs;
	            }
	            else if (ieg instanceof Poly) {
	                var pl = ieg;
	                var pls = '';
	                pls += '{';
	                pls += 'edgeclass:' + "'" + pl.edgeclass + "',";
	                pls += 'v:' + pl.v + ',';
	                pls += 'w:' + pl.w + ',';
	                pls += 'tag:' + pl.tag + ',';
	                pls += 'usermark:' + pl.usermark + ',';
	                pls += 'nodes:';
	                pls += float3.ListToString(pl.nodes, p);
	                pls += '},';
	                ans += pls;
	            }
	        }
	        ans += ']}';
	        return ans;
	    }
	    fromjson(str) {
	        this.clear();
	        var sh = new StringHelper(str);
	        var s;
	        s = sh.ReadAB("normal:'", "',");
	        this.normal = float3.fromString(s);
	        s = sh.ReadAB('ves:[', ']');
	        this.ves = float3.fromStringList(s);
	        sh.Jump('egs:');
	        s = sh.ReadBracketContent('[', ']');
	        var psh = new StringHelper(s);
	        while (psh.Jump('{')) {
	            var edgeclass = psh.ReadABContent("edgeclass:'", "',");
	            var ieg;
	            var poly = null;
	            switch (edgeclass) {
	                case 'Segment':
	                    ieg = new Segment();
	                    break;
	                case 'BezierCurvesPoly':
	                    poly = new BezierCurvesPoly();
	                    ieg = poly;
	                    break;
	                case 'ArcCurvesPoly':
	                    poly = new ArcCurvesPoly();
	                    ieg = poly;
	                    break;
	                case 'Poly':
	                    poly = new Poly();
	                    ieg = poly;
	                    break;
	            }
	            ieg.v = Number(psh.ReadABContent('v:', ','));
	            ieg.w = Number(psh.ReadABContent('w:', ','));
	            ieg.tag = Number(psh.ReadABContent('tag:', ','));
	            ieg.usermark = Number(psh.ReadABContent('mark:', ','));
	            if (poly)
	                poly.nodes = float3.fromStringList(psh.ReadAB('nodes:[', ']'));
	            this.egs.push(ieg);
	        }
	    }
	    CalculateBoxBounds() {
	        this.boxbound = new BoxBound();
	        var ans = this.boxbound;
	        var min = new float3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
	        var max = new float3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            var p = this.ves[i];
	            max.x = Math.max(p.x, max.x);
	            max.y = Math.max(p.y, max.y);
	            max.z = Math.max(p.z, max.z);
	            min.x = Math.min(p.x, min.x);
	            min.y = Math.min(p.y, min.y);
	            min.z = Math.min(p.z, min.z);
	        }
	        ans.max = max;
	        ans.min = min;
	        ans.size = max.sub(min);
	        ans.center = float3.lerp(min, max, 0.5);
	    }
	    applyTransform(t) {
	        var zero = t.mulvector(new float3());
	        this.normal = t.mulvector(this.normal).sub(zero).normal();
	        var i, j;
	        for (i = 0; i < this.ves.length; i++) {
	            this.ves[i] = t.mulvector(this.ves[i]);
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            var poly = this.egs[i];
	            if (!(poly instanceof Poly))
	                continue;
	            for (j = 0; j < poly.nodes.length; j++) {
	                poly.nodes[j] = t.mulvector(poly.nodes[j]);
	            }
	        }
	    }
	    LocateEdgeByRefTag(reftag) {
	        var i;
	        var edge;
	        var res = new IEdgeLocation();
	        for (i = 0; i < this.egs.length; i++) {
	            edge = this.egs[i];
	            if (edge.reftag != reftag)
	                continue;
	            res.type = edge.edgeclass;
	            res.index = i;
	            return res;
	        }
	        return null;
	    }
	    LocateEdgeByTag(tag) {
	        var i;
	        var edge;
	        var res = new IEdgeLocation();
	        for (i = 0; i < this.egs.length; i++) {
	            edge = this.egs[i];
	            if (edge.tag != tag)
	                continue;
	            res.type = edge.edgeclass;
	            res.index = i;
	            return res;
	        }
	        return null;
	    }
	    FindEdgesByTag(tag) {
	        var i;
	        var edge;
	        var res = new Array();
	        for (i = 0; i < this.egs.length; i++) {
	            edge = this.egs[i];
	            if (edge.tag != tag)
	                continue;
	            res.push(edge);
	        }
	        return res;
	    }
	    FindEdgeByTag(tag) {
	        var i;
	        var edge;
	        var res = new Array();
	        for (i = 0; i < this.egs.length; i++) {
	            edge = this.egs[i];
	            if (edge.tag != tag)
	                continue;
	            return edge;
	        }
	        return null;
	    }
	    GetPoints(eg) {
	        return [this.ves[eg.v], this.ves[eg.w]];
	    }
	    TagSize() {
	        var maxtag = 0;
	        var i;
	        for (i = 0; i < this.egs.length; i++) {
	            maxtag = Math.max(maxtag, this.egs[i].tag + 1);
	        }
	        return maxtag;
	    }
	    TagAll() {
	        // *为每个对象分配tag
	        // *对于被分配到相同tag的对象，避开该tag进行全新的分配
	        // *重用不被使用的tag
	        var i, j;
	        var eg, eg1;
	        var tagusecount = [];
	        lstool.init(tagusecount, 0, Math.max(this.TagSize(), this.egs.length));
	        for (i = 0; i < this.egs.length; i++) {
	            eg = this.egs[i];
	            if (eg.tag < 0)
	                continue;
	            tagusecount[eg.tag]++; //计算tag的引用
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            eg = this.egs[i];
	            if (eg.tag < 0 || tagusecount[eg.tag] == 1)
	                continue;
	            for (j = i + 1; j < this.egs.length; j++) {
	                eg1 = this.egs[j];
	                if (eg1.tag != eg.tag)
	                    continue;
	                eg1.tag = -1; //取消eg对失效tag的引用
	                tagusecount[eg.tag]--;
	                if (tagusecount[eg.tag] == 1)
	                    break;
	            }
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            eg = this.egs[i];
	            if (eg.tag >= 0)
	                continue;
	            for (j = 0; j < tagusecount.length; j++) {
	                if (tagusecount[j] == 1)
	                    continue;
	                eg.tag = j;
	                tagusecount[j]++;
	                break;
	            }
	        }
	    }
	    addsegment(v, w) {
	        var iv, iw;
	        iv = this.addpoint(v);
	        iw = this.addpoint(w);
	        var sg = new Segment(iv, iw);
	        this.egs.push(sg);
	        return sg;
	    }
	    addloop(ves) {
	        var i;
	        var v, w;
	        var iv, iw;
	        v = ves[0];
	        iv = this.addpoint(v);
	        for (i = 0; i < ves.length; i++) {
	            w = ves[(i + 1) % ves.length];
	            iw = this.addpoint(w);
	            var sg = new Segment(iv, iw);
	            this.egs.push(sg);
	            iv = iw;
	        }
	    }
	    remove(edge) {
	        var i;
	        for (i = 0; i < this.egs.length; i++) {
	            if (this.egs[i] != edge)
	                continue;
	            this.egs.splice(i, 1);
	            return;
	        }
	    }
	    selet_none() {
	        var i;
	        for (i = 0; i < this.egs.length; i++) {
	            this.egs[i].selected = false;
	        }
	    }
	    heal_ves() {
	        var good = [];
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            var status = v && isFinite(v.x) && isFinite(v.y) && isFinite(v.z);
	            good.push(status);
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            var eg = this.egs[i];
	            if (good[eg.v] && good[eg.w])
	                continue;
	            this.egs.splice(i--, 1);
	        }
	    }
	    simplify_ves_replace_duplicated(dis_err = CalcConst.dis_err) {
	        var i, j;
	        var eg;
	        var v0;
	        //替换重复点
	        var ves_mapping = new Array();
	        ves_mapping.length = this.ves.length;
	        for (i = 0; i < this.ves.length; i++) {
	            ves_mapping[i] = i;
	        }
	        for (i = 0; i < this.ves.length; i++) {
	            if (ves_mapping[i] != i)
	                continue;
	            v0 = this.ves[i];
	            for (j = i + 1; j < this.ves.length; j++) {
	                if (v0.nearequals(this.ves[j], dis_err)) {
	                    ves_mapping[j] = i;
	                }
	            }
	        }
	        for (i = 0; i < this.egs.length; i++) { // 整理边信息
	            eg = this.egs[i];
	            eg.v = ves_mapping[eg.v];
	            eg.w = ves_mapping[eg.w];
	        }
	    }
	    simplify_ves_remove_unuse() {
	        var i;
	        var eg;
	        //删除无用顶点
	        var ves_mapping = new Array();
	        var ves_count = new Array();
	        lstool.init(ves_count, 0, this.ves.length);
	        for (i = 0; i < this.egs.length; i++) { //计算节点引用数
	            eg = this.egs[i];
	            ves_count[eg.v]++;
	            ves_count[eg.w]++;
	        }
	        var ves_1 = new Array();
	        ves_mapping.length = this.ves.length;
	        for (i = 0; i < this.ves.length; i++) {
	            if (ves_count[i] == 0)
	                continue;
	            ves_mapping[i] = ves_1.length;
	            ves_1.push(this.ves[i]);
	        }
	        for (i = 0; i < this.egs.length; i++) { // 整理边信息
	            eg = this.egs[i];
	            eg.v = ves_mapping[eg.v];
	            eg.w = ves_mapping[eg.w];
	        }
	        this.ves = ves_1;
	    }
	    clear() {
	        this.ves.length = 0;
	        this.egs.length = 0;
	        this.out.clear();
	    }
	    clone() {
	        var i;
	        var res = new GenedgeStructure();
	        for (i = 0; i < this.ves.length; i++) {
	            res.ves.push(this.ves[i].clone());
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            res.egs.push(this.egs[i].clone());
	        }
	        res.normal = this.normal.clone();
	        return res;
	    }
	    delete_duplicate() {
	        var i, j;
	        var b0, b1;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            if (b0 instanceof Segment) {
	                for (j = i + 1; j < this.egs.length; j++) {
	                    b1 = this.egs[j];
	                    if (b0.edgeclass == b1.edgeclass && (b0.v - b1.v) * (b0.v - b1.w) == 0 && (b0.w - b1.v) * (b0.w - b1.w) == 0) {
	                        this.egs.splice(j, 1);
	                        j--;
	                        continue;
	                    }
	                }
	            }
	            else if (b0 instanceof Poly) {
	                for (j = i + 1; j < this.egs.length; j++) {
	                    b1 = this.egs[j];
	                    var p0 = b0;
	                    var p1 = b1;
	                    if (b0.edgeclass == b1.edgeclass && (b0.v - b1.v) * (b0.v - b1.w) == 0 && (b0.w - b1.v) * (b0.w - b1.w) == 0 && p0.nodes[0].equals(p1.nodes[0])) {
	                        this.egs.splice(j, 1);
	                        j--;
	                        continue;
	                    }
	                }
	            }
	        }
	    }
	    delete_empty() {
	        var i;
	        var b0;
	        var p;
	        for (i = 0; i < this.egs.length; i++) {
	            b0 = this.egs[i];
	            p = b0;
	            if (b0.v != b0.w)
	                continue;
	            if (b0 instanceof Poly && p.nodes.length >= 0)
	                continue;
	            this.egs.splice(i, 1);
	            i--;
	        }
	    }
	    BuildSegmentOnly() {
	        var i;
	        var pl;
	        var sg;
	        var ieg;
	        var eg;
	        this.out.clear();
	        this.out.normal = this.normal;
	        for (i = 0; i < this.egs.length; i++) {
	            pl = this.egs[i];
	            if (!(pl instanceof Poly))
	                continue;
	            pl.Build(this.ves);
	        }
	        for (i = 0; i < this.ves.length; i++) {
	            this.out.ves.push(this.ves[i].clone());
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            ieg = this.egs[i];
	            if (ieg instanceof Segment) {
	                sg = ieg;
	                eg = new Edge(sg.v, sg.w);
	                eg.tag = sg.tag;
	                eg.reftag = sg.reftag;
	                eg.usermark = sg.usermark;
	                eg.structuretag = this.structuretag;
	                this.out.egs.push(eg);
	            }
	        }
	    }
	    Build() {
	        var i, j;
	        var pl;
	        var sg;
	        var ieg;
	        var eg;
	        this.out.clear();
	        this.out.normal = this.normal;
	        for (i = 0; i < this.egs.length; i++) {
	            pl = this.egs[i];
	            if (!(pl instanceof Poly))
	                continue;
	            pl.Build(this.ves);
	        }
	        for (i = 0; i < this.ves.length; i++) {
	            this.out.ves.push(this.ves[i].clone());
	        }
	        for (i = 0; i < this.egs.length; i++) {
	            ieg = this.egs[i];
	            if (ieg instanceof Segment) {
	                sg = ieg;
	                eg = new Edge(sg.v, sg.w);
	                eg.tag = sg.tag;
	                eg.reftag = sg.reftag;
	                eg.usermark = sg.usermark;
	                eg.structuretag = this.structuretag;
	                this.out.egs.push(eg);
	            }
	            else if (ieg instanceof Poly) {
	                pl = ieg;
	                pl.Build(this.ves);
	                for (j = 0; j < pl.out.length - 1; j++) {
	                    var idx0 = this.out.addpoint(pl.out[j].clone());
	                    var idx1 = this.out.addpoint(pl.out[j + 1].clone());
	                    eg = new Edge(idx0, idx1);
	                    eg.tag = pl.tag;
	                    eg.reftag = pl.reftag;
	                    eg.usermark = pl.usermark;
	                    eg.structuretag = this.structuretag;
	                    this.out.egs.push(eg);
	                }
	            }
	        }
	    }
	    search(pos, range = Number.MAX_VALUE) {
	        var bst_dis = range;
	        var bst_eg;
	        var bst_egidx;
	        var bst_egtype;
	        var bst_point;
	        var bst_v, bst_w;
	        var dis;
	        var i, j;
	        var sg;
	        var cu;
	        var ieg;
	        for (i = 0; i < this.egs.length; i++) {
	            ieg = this.egs[i];
	            if (ieg instanceof Segment) {
	                sg = ieg;
	                dis = VectorCalc.dotSegmentDistance(pos, this.ves[sg.v], this.ves[sg.w]);
	                if (dis < bst_dis) {
	                    bst_dis = dis;
	                    bst_eg = sg;
	                    bst_egtype = 'segment';
	                    bst_egidx = i;
	                    bst_v = this.ves[sg.v];
	                    bst_w = this.ves[sg.w];
	                }
	            }
	            if (ieg instanceof Poly) {
	                cu = ieg;
	                for (j = 0; j < cu.out.length - 1; j++) {
	                    dis = VectorCalc.dotSegmentDistance(pos, cu.out[j], cu.out[j + 1]);
	                    if (dis < bst_dis) {
	                        bst_dis = dis;
	                        bst_eg = cu;
	                        bst_egtype = 'poly';
	                        bst_egidx = i;
	                        bst_v = cu.out[j];
	                        bst_w = cu.out[j + 1];
	                    }
	                }
	            }
	        }
	        var res = new GenedgeDataSearchRes();
	        if (bst_dis >= range)
	            return null;
	        var sgn = bst_w.sub(bst_v).normal();
	        bst_point = pos.sub(bst_v).proj(sgn).add(bst_v);
	        res.distance = bst_dis;
	        res.edge = bst_eg;
	        res.edgeidx = bst_egidx;
	        res.edgetype = bst_egtype;
	        res.nearestpos = bst_point;
	        return res;
	    }
	    addpoint(v) {
	        if (isNaN(v.x)) {
	            console.log('VECTOT ERROR');
	        }
	        var j;
	        var found_same = false;
	        for (j = 0; j < this.ves.length; j++) {
	            if (this.ves[j].nearequals(v, CalcConst.dis_err)) {
	                found_same = true;
	                break;
	            }
	        }
	        if (found_same) {
	            return j;
	        }
	        else {
	            this.ves.push(v.clone());
	            return this.ves.length - 1;
	        }
	    }
	    align(kit) {
	    }
	}

	class ProcessDeformationShapeTracking {
	    constructor() {
	        this.memory_es = new EdgeStructure();
	        this.memory_paths = new Array();
	        this.memory_shapes = new Array();
	        this.structure_mapping_str = new Array();
	        this.structure_mapping = [];
	        this.structure_mapping_inv = [];
	        this.pathsid = new Array();
	        this.pathsid_remvoed = new Array();
	        this.pathsid_added = new Array();
	    }
	    clear() {
	        this.memory_es.clear();
	        this.memory_paths.length = 0;
	        this.memory_shapes.length = 0;
	        this.structure_mapping_str.length = 0;
	        this.structure_mapping.length = 0;
	        this.structure_mapping_inv.length = 0;
	        this.pathsid.length = 0;
	        this.pathsid_remvoed.length = 0;
	        this.pathsid_added.length = 0;
	    }
	    memorize(es, paths, vls) {
	        this.memory_es.egs.length = 0;
	        this.memory_paths.length = 0;
	        this.memory_shapes.length = 0;
	        var i;
	        for (i = 0; i < es.egs.length; i++) {
	            this.memory_es.egs.push(es.egs[i]);
	        }
	        for (i = 0; i < paths.length; i++) {
	            this.memory_paths.push(paths[i]);
	        }
	        for (i = 0; i < vls.length; i++) {
	            this.memory_shapes.push(vls[i]);
	        }
	    }
	    compare(es, paths, shapes) {
	        this.structure_mapping_str.length = 0;
	        this.structure_mapping.length = 0;
	        this.structure_mapping_inv.length = 0;
	        var i, j, k;
	        var keys;
	        var memory_key;
	        var eg0;
	        var eg1;
	        var tag;
	        var key;
	        var egi, egj;
	        var memory_keys = [];
	        var memory_paths_inside_pos = [];
	        for (i = 0; i < this.memory_paths.length; i++) {
	            var path1 = this.memory_paths[i];
	            var path1len = path1.egs.length;
	            memory_key = [];
	            tag = null;
	            for (j = 0; j < path1len; j++) {
	                egi = path1.egs[j];
	                eg0 = this.memory_es.egs[egi];
	                if (eg0.tag == tag)
	                    continue;
	                tag = eg0.tag;
	                key = eg0.structuretag + ',' + eg0.tag;
	                egj = path1.egs[(j + 1) % path1len];
	                eg1 = this.memory_es.egs[egj];
	                if (eg0.tag == eg1.tag) {
	                    key += ((egi < egj) ? '+' : '-');
	                }
	                memory_key.push(key);
	            }
	            memory_keys.push(memory_key);
	        }
	        var shape;
	        for (i = 0; i < this.memory_paths.length; i++) {
	            shape = this.memory_shapes[i];
	            var memory_inside_pos = shape.ves[1].sub(shape.ves[0]).crossnormalize(shape.normal).scale(-CalcConst.unit).add(float3.lerp(shape.ves[0], shape.ves[1]));
	            memory_paths_inside_pos.push(memory_inside_pos);
	        }
	        for (i = 0; i < paths.length; i++) {
	            var path0 = paths[i];
	            var structurepair = [];
	            shape = shapes[i];
	            var inside_pos = shape.ves[1].sub(shape.ves[0]).crossnormalize(shape.normal).scale(-CalcConst.unit).add(float3.lerp(shape.ves[0], shape.ves[1]));
	            var path0len = path0.egs.length;
	            keys = [];
	            tag = null;
	            for (j = 0; j < path0len; j++) {
	                egi = path0.egs[j];
	                eg0 = es.egs[egi];
	                if (eg0.tag == tag)
	                    continue;
	                tag = eg0.tag;
	                key = eg0.structuretag + ',' + eg0.tag;
	                egj = path0.egs[(j + 1) % path0len];
	                eg1 = es.egs[egj];
	                if (eg0.tag == eg1.tag) {
	                    key += ((egi < egj) ? '+' : '-');
	                }
	                keys.push(key);
	            }
	            var structurepair_type = '->';
	            for (j = 0; j < memory_keys.length; j++) {
	                memory_key = memory_keys[j];
	                path1 = this.memory_paths[j];
	                if (Math.abs(keys.length - memory_key.length) > 1 || !lstool.listcontain(keys, memory_key))
	                    continue;
	                if (path0.dir.dot(path1.dir) < 0)
	                    continue;
	                structurepair.push(j);
	                break;
	            }
	            if (structurepair.length == 0) {
	                for (j = this.memory_shapes.length - 1; j >= 0; j--) {
	                    if (this.memory_shapes[j].ContainPointANGLESUM(inside_pos) == 0)
	                        continue;
	                    structurepair.push(j);
	                    var found = false;
	                    for (k = 0; k < shape.ves.length; k++) {
	                        if (this.memory_shapes[j].ContainPointANGLESUM(shape.ves[k]) == 1)
	                            continue;
	                        found = true;
	                        break;
	                    }
	                    if (found)
	                        break;
	                    structurepair_type = '+>';
	                    break;
	                }
	                if (structurepair.length > 0) {
	                    //面合并
	                    var pairs = [];
	                    for (j = 0; j < this.memory_shapes.length; j++) {
	                        if (shape.ContainPointANGLESUM(memory_paths_inside_pos[j]) == 0)
	                            continue;
	                        pairs.push(j);
	                    }
	                    if (pairs.length >= 2) {
	                        structurepair = pairs;
	                        structurepair_type = '=>';
	                    }
	                }
	            }
	            this.structure_mapping_str.push(i + structurepair_type + structurepair.toString());
	            this.structure_mapping.push(structurepair);
	        }
	        for (i = 0; i < this.structure_mapping.length; i++) {
	            structurepair = this.structure_mapping[i];
	            for (j = 0; j < structurepair.length; j++) {
	                var list = this.structure_mapping_inv[structurepair[j]];
	                if (list == null) {
	                    list = [];
	                    this.structure_mapping_inv[structurepair[j]] = list;
	                }
	                list.push(i);
	            }
	        }
	    }
	    summarize(paths) {
	        this.pathsid_added.length = 0;
	        this.pathsid_remvoed.length = 0;
	        this.pathsid_added = [];
	        this.pathsid_remvoed = [];
	        var npathsidx = new Array();
	        lstool.init(npathsidx, -1, paths.length);
	        var i, j;
	        var idmap = new Array();
	        lstool.init(idmap, false, this.structure_mapping.length);
	        var relationuse = new Array();
	        var r;
	        lstool.init(relationuse, 0, this.pathsid.length);
	        for (i = 0; i < this.structure_mapping.length; i++) { //通过对id的引用推断出已经被删除的id
	            r = this.structure_mapping[i];
	            if (r.length != 1)
	                continue;
	            relationuse[r[0]]++;
	        }
	        for (i = 0; i < relationuse.length; i++) { // 删除没有被引用（被删除掉的）pathid
	            if (relationuse[i] == 1)
	                continue;
	            this.pathsid_remvoed.push(this.pathsid[i]);
	        }
	        for (i = 0; i < this.structure_mapping.length; i++) { //处理已有的id对应
	            r = this.structure_mapping[i];
	            if (r.length != 1)
	                continue;
	            if (relationuse[r[0]] != 1)
	                continue; // 只有一个引用
	            var id = this.pathsid[r[0]];
	            npathsidx[i] = id;
	            for (j = idmap.length; j <= id; j++) {
	                idmap[j] = false;
	            }
	            idmap[id] = true;
	        }
	        for (i = 0; i < this.structure_mapping.length; i++) { //分配新id
	            r = this.structure_mapping[i];
	            if (r.length == 1 && relationuse[r[0]] == 1)
	                continue;
	            for (j = 0; j < idmap.length; j++) {
	                if (idmap[j] == true)
	                    continue;
	                break;
	            }
	            if (j == idmap.length)
	                idmap.push(false);
	            npathsidx[i] = j;
	            idmap[j] = true;
	            this.pathsid_added.push(j);
	        }
	        this.pathsid = npathsidx;
	    }
	}

	class ProcessDeformationEdgeTracking {
	    constructor() {
	        this.sgs_memorymap = new Array();
	        this.egsid = new Array();
	        this.egsdel_ids = [];
	        this.egsnew_ids = [];
	        this.memory_gd = new GenedgeStructure();
	    }
	    clear() {
	        this.memory_gd.clear();
	        this.sgs_memorymap.length = 0;
	        this.egsid.length = 0;
	        this.egsdel_ids.length = 0;
	        this.egsnew_ids.length = 0;
	    }
	    memorize(data) {
	        this.memory_gd.clear();
	        var i;
	        for (i = 0; i < data.egs.length; i++) {
	            this.memory_gd.egs.push(data.egs[i]);
	        }
	    }
	    compare(data) {
	        var i, j;
	        this.sgs_memorymap.length = 0;
	        lstool.init(this.sgs_memorymap, -1, data.egs.length);
	        for (i = 0; i < this.memory_gd.egs.length; i++) {
	            var eg0 = this.memory_gd.egs[i];
	            var eg1;
	            if (eg0.tag < 0)
	                continue;
	            for (j = 0; j < data.egs.length; j++) {
	                if (this.sgs_memorymap[j] > -1)
	                    continue;
	                eg1 = data.egs[j];
	                if (eg0.tag == eg1.tag)
	                    break;
	            }
	            if (j == data.egs.length) {
	                continue;
	            }
	            this.sgs_memorymap[j] = i;
	        }
	    }
	    summarize(data) {
	        var i, j;
	        var idmap = new Array();
	        lstool.init(idmap, false, data.egs.length);
	        if (this.sgs_memorymap.length == 0) {
	            lstool.init(this.sgs_memorymap, -1, data.egs.length);
	        }
	        var sgsid_nex = new Array();
	        lstool.init(sgsid_nex, -1, data.egs.length);
	        for (i = 0; i < data.egs.length; i++) {
	            if (this.sgs_memorymap[i] < 0)
	                continue;
	            sgsid_nex[i] = this.egsid[this.sgs_memorymap[i]];
	        }
	        var id;
	        for (i = 0; i < data.egs.length; i++) {
	            id = sgsid_nex[i];
	            if (id < 0)
	                continue;
	            for (j = idmap.length; j <= id; j++) {
	                idmap.push(false);
	            }
	            if (idmap[id] == true)
	                continue;
	            idmap[id] = true;
	        }
	        { // segment
	            this.egsdel_ids = [];
	            this.egsnew_ids = [];
	            var sgs_use = new Array();
	            lstool.init(sgs_use, false, this.egsid.length);
	            for (i = 0; i < this.sgs_memorymap.length; i++) {
	                if (this.sgs_memorymap[i] < 0)
	                    continue;
	                sgs_use[this.sgs_memorymap[i]] = true;
	            }
	            for (i = 0; i < this.egsid.length; i++) { //丢失的id
	                if (sgs_use[i])
	                    continue;
	                this.egsdel_ids.push(this.egsid[i]);
	            }
	            j = 0;
	            for (i = 0; i < data.egs.length; i++) { //新增id的索引
	                id = sgsid_nex[i];
	                if (id >= 0)
	                    continue;
	                for (j; j < idmap.length; j++) {
	                    if (idmap[j])
	                        continue;
	                    break;
	                }
	                idmap[j] = true;
	                sgsid_nex[i] = j++;
	                this.egsnew_ids.push(sgsid_nex[i]);
	            }
	        }
	        this.egsid = sgsid_nex;
	    }
	}

	class timer {
	    constructor() {
	        this.time0 = new Date().getTime() / 1000;
	    }
	    end() {
	        this.time1 = new Date().getTime() / 1000;
	        return this.time1 - this.time0;
	    }
	}

	class ProcessFormat {
	    static formatSegmentOnly(dst, src) {
	        var es = src.out.clone();
	        ProcessFormat.proessEdgeStructureToGenedgeData_SegmentOnly(src, es, dst);
	        dst.out = es;
	    }
	    static proessEdgeStructureToGenedgeData_SegmentOnly(src, es, dst) {
	        var i;
	        var segfilter = new Array();
	        lstool.init(segfilter, false, dst.TagSize());
	        var ieg;
	        for (i = 0; i < src.egs.length; i++) { //区分线段
	            ieg = src.egs[i];
	            if (ieg instanceof Segment)
	                segfilter[ieg.tag] = true;
	        }
	        var polys = [];
	        for (i = 0; i < src.egs.length; i++) {
	            ieg = src.egs[i];
	            if (!(ieg instanceof Poly))
	                continue;
	            polys[i] = ieg;
	        }
	        dst.egs.length = 0;
	        var sg;
	        var eg;
	        for (i = 0; i < es.egs.length; i++) { //提取线段
	            eg = es.egs[i];
	            if (!segfilter[eg.tag])
	                continue;
	            sg = new Segment();
	            sg.v = dst.addpoint(es.ves[eg.v]);
	            sg.w = dst.addpoint(es.ves[eg.w]);
	            if (sg.v == sg.w)
	                return;
	            sg.tag = eg.tag;
	            sg.usermark = eg.usermark;
	            dst.egs.push(sg);
	        }
	        for (i = 0; i < polys.length; i++) {
	            ieg = polys[i];
	            if (!ieg)
	                continue;
	            if (i < dst.egs.length) {
	                dst.egs.splice(i, 0, ieg);
	            }
	            else {
	                dst.egs.push(ieg);
	            }
	        }
	    }
	    static format(dst, src) {
	        var es = src.out.clone();
	        ProcessFormat.proessEdgeStructureToGenedgeData(src, es, dst);
	        dst.out = es;
	    }
	    static proessEdgeStructureToGenedgeData(src, es, dst) {
	        var i, j;
	        var segfilter = new Array();
	        lstool.init(segfilter, false, dst.TagSize());
	        for (i = 0; i < src.egs.length; i++) { //区分线段
	            var ieg = src.egs[i];
	            if (ieg instanceof Segment)
	                segfilter[ieg.tag] = true;
	        }
	        dst.egs.length = 0;
	        var sg;
	        var eg;
	        for (i = 0; i < es.egs.length; i++) { //提取线段
	            eg = es.egs[i];
	            if (!segfilter[eg.tag])
	                continue;
	            sg = new Segment();
	            sg.v = dst.addpoint(es.ves[eg.v]);
	            sg.w = dst.addpoint(es.ves[eg.w]);
	            if (sg.v == sg.w)
	                return;
	            sg.tag = eg.tag;
	            sg.usermark = eg.usermark;
	            dst.egs.push(sg);
	        }
	        var vesusecount = new Array();
	        lstool.init(vesusecount, 0, es.ves.length);
	        for (i = 0; i < es.egs.length; i++) { //列出线段交点
	            eg = es.egs[i];
	            vesusecount[eg.v]++;
	            vesusecount[eg.w]++;
	        }
	        var polysfragments = new Array();
	        for (i = 0; i < es.egs.length; i++) { //提取多边线碎片
	            eg = es.egs[i];
	            if (segfilter[eg.tag])
	                continue;
	            polysfragments.push(eg);
	        }
	        var polyfragmentsfilter = new Array();
	        lstool.init(polyfragmentsfilter, false, polysfragments.length);
	        for (j = 0; j < polysfragments.length; j++) {
	            if (polyfragmentsfilter[j])
	                continue;
	            var startegidx = j;
	            var start = polysfragments[startegidx];
	            var headv = start.v;
	            var headw = start.w;
	            var nextegidx;
	            var nextw;
	            var nextv;
	            var polyfrag;
	            var polyvlist = new Array();
	            var polywlist = new Array();
	            polyvlist.push(headv);
	            polywlist.push(headw);
	            polyfragmentsfilter[startegidx] = true;
	            while (true) {
	                nextw = -1;
	                for (i = 0; i < polysfragments.length; i++) {
	                    if (polyfragmentsfilter[i])
	                        continue;
	                    polyfrag = polysfragments[i];
	                    if (start.tag != polyfrag.tag)
	                        break;
	                    if (headw == polyfrag.v) {
	                        nextegidx = i;
	                        nextw = polyfrag.w;
	                        break;
	                    }
	                    else if (headw == polyfrag.w) {
	                        nextegidx = i;
	                        nextw = polyfrag.v;
	                        break;
	                    }
	                }
	                if (nextw < 0)
	                    break;
	                polyfragmentsfilter[nextegidx] = true;
	                headw = nextw;
	                polywlist.push(headw);
	                if (vesusecount[headw] > 2)
	                    break;
	            }
	            while (true) {
	                nextv = -1;
	                for (i = 0; i < polysfragments.length; i++) {
	                    if (polyfragmentsfilter[i])
	                        continue;
	                    polyfrag = polysfragments[i];
	                    if (start.tag != polyfrag.tag)
	                        break;
	                    if (headv == polyfrag.v) {
	                        nextegidx = i;
	                        nextv = polyfrag.w;
	                        break;
	                    }
	                    else if (headv == polyfrag.w) {
	                        nextegidx = i;
	                        nextv = polyfrag.v;
	                        break;
	                    }
	                }
	                if (nextv < 0)
	                    break;
	                polyfragmentsfilter[nextegidx] = true;
	                headv = nextv;
	                polyvlist.push(headv);
	                if (vesusecount[headv] > 2)
	                    break;
	            }
	            var polylist = new Array();
	            for (i = polyvlist.length - 1; i >= 0; i--) {
	                polylist.push(polyvlist[i]);
	            }
	            for (i = 0; i < polywlist.length; i++) {
	                polylist.push(polywlist[i]);
	            }
	            var poly = new Poly();
	            poly.v = dst.addpoint(es.ves[polylist[0]]);
	            poly.w = dst.addpoint(es.ves[polylist[polylist.length - 1]]);
	            for (i = 1; i < polylist.length - 1; i++) {
	                poly.nodes.push(es.ves[polylist[i]]);
	            }
	            poly.tag = start.tag;
	            poly.usermark = start.usermark;
	            dst.egs.push(poly);
	        }
	    }
	}

	class ProcessEdgeAndShapePacking {
	    constructor(genedgedata, use_version_2 = false) {
	        this.use_break_segment = true;
	        this.use_build_keep_line_devide = true;
	        this.use_simplify_output = false;
	        this.use_ves_merge = CalcConst.dis_err;
	        this.use_version_2 = false;
	        this.log = false;
	        this.gs = genedgedata;
	        this.use_version_2 = use_version_2;
	        this.gs_formated = new GenedgeStructure();
	        this.edgetracker = new ProcessDeformationEdgeTracking();
	        this.edgeformatedtracker = new ProcessDeformationEdgeTracking();
	        this.shapefinder = new ProcessFindEdgeLoopMin();
	        this.shapetracker = new ProcessDeformationShapeTracking();
	        this.shapemaxfinder = new ProcessFindEdgeLoopMax();
	        this.shapemaxtraccker = new ProcessDeformationShapeTracking();
	        this.Build();
	    }
	    SearchShapeID(pos) {
	        var i;
	        for (i = 0; i < this.shapefinder.vectorloops.length; i++) {
	            if (!this.shapefinder.vectorloops[i].ContainPointANGLESUM(pos))
	                continue;
	            return this.shapetracker.pathsid[i];
	        }
	    }
	    SearchGroupID(pos) {
	        var i;
	        for (i = 0; i < this.shapemaxfinder.vectorloops.length; i++) {
	            if (!this.shapemaxfinder.vectorloops[i].ContainPointANGLESUM(pos))
	                continue;
	            return this.shapemaxtraccker.pathsid[i];
	        }
	    }
	    clear() {
	        this.gs_formated.clear();
	        this.edgetracker.clear();
	        this.edgeformatedtracker.clear();
	        this.shapetracker.clear();
	        this.shapemaxtraccker.clear();
	    }
	    Build(use_tracking = true) {
	        var i, j, k;
	        { //用户数据处理
	            {
	                this.gs.heal_ves();
	                this.gs.simplify_ves_replace_duplicated(this.use_ves_merge);
	                this.gs.simplify_ves_remove_unuse();
	                this.gs.delete_empty();
	                this.gs.delete_duplicate();
	            }
	            this.gs.BuildSegmentOnly();
	            {
	                this.gs.out.calc_ready = false;
	                this.gs.out.divide_overlaping();
	                this.gs.out.delete_duplicate();
	                if (this.use_break_segment)
	                    this.gs.out.divide_crossing();
	                if (!this.use_build_keep_line_devide) {
	                    this.gs.out.simplify_combinable();
	                    this.use_simplify_output = false;
	                }
	                ProcessFormat.formatSegmentOnly(this.gs, this.gs);
	            }
	            this.gs.TagAll(); //更新ID 输出新结构
	            this.gs.Build();
	            {
	                this.gs.out.calc_ready = false;
	                this.gs.out.divide_crossing();
	                if (this.use_simplify_output)
	                    this.gs.out.simplify_combinable(); // simplify out put data
	                this.gs.out.simplify_ves_replace_duplicated();
	            }
	            if (!use_tracking)
	                this.edgetracker.memorize(this.gs); // 纪录当前边线信息
	            this.edgetracker.compare(this.gs); // 捕获边线变动
	            this.edgetracker.summarize(this.gs);
	            this.edgetracker.memorize(this.gs); // 纪录当前边线信息
	        }
	        { //输出数据处理
	            this.gs_formated.normal = this.gs.normal.clone();
	            this.gs_formated.structuretag = this.gs.structuretag;
	            ProcessFormat.format(this.gs_formated, this.gs); // 分段格式化
	            for (i = 0; i < this.gs_formated.egs.length; i++) {
	                this.gs_formated.egs[i].reftag = i;
	            }
	            this.gs_formated.Build();
	            if (!use_tracking)
	                this.edgeformatedtracker.memorize(this.gs_formated); // 纪录当前边线信息
	            this.edgeformatedtracker.compare(this.gs_formated); // 捕获边线变动
	            this.edgeformatedtracker.summarize(this.gs_formated);
	            this.edgeformatedtracker.memorize(this.gs_formated); // 纪录当前边线信息
	            this.gs_formated.out.calc_ready = false;
	            this.shapefinder.run(this.gs_formated.out); //从结构中查找区域
	            this.shapefinder.build_hierarchy();
	            if (!use_tracking)
	                this.shapetracker.memorize(this.gs_formated.out, this.shapefinder.paths, this.shapefinder.vectorloops); // 纪录当前区域信息
	            this.shapetracker.compare(this.gs_formated.out, this.shapefinder.paths, this.shapefinder.vectorloops);
	            this.shapetracker.summarize(this.shapefinder.paths); // 捕获区域变动
	            this.shapetracker.memorize(this.gs_formated.out, this.shapefinder.paths, this.shapefinder.vectorloops); // 纪录当前区域信息
	            this.shapemaxfinder; //从结构中查找区域
	            {
	                this.shapemaxfinder = this.shapefinder.shapemaxfinder;
	            }
	            if (!use_tracking)
	                this.shapemaxtraccker.memorize(this.gs_formated.out, this.shapemaxfinder.paths, this.shapemaxfinder.vectorloops);
	            this.shapemaxtraccker.compare(this.gs_formated.out, this.shapemaxfinder.paths, this.shapemaxfinder.vectorloops);
	            this.shapemaxtraccker.summarize(this.shapemaxfinder.paths);
	            this.shapemaxtraccker.memorize(this.gs_formated.out, this.shapemaxfinder.paths, this.shapemaxfinder.vectorloops);
	        }
	        this.shapemax_shape_relations = [];
	        this.shape_shapemax_relations = [];
	        for (i = 0; i < this.shapefinder.hulls.length; i++) {
	            if (this.shapefinder.hulls[i].level > 0)
	                break; // level 0 only
	            var subpaths = this.shapefinder.hierarchy_hull_shape[i].concat();
	            for (j = 0; j < subpaths.length; j++) {
	                var ssp = this.shapefinder.hierarchy_shape_shape[subpaths[j]];
	                for (k = 0; k < ssp.length; k++) {
	                    subpaths.push(ssp[k]);
	                }
	            }
	            this.shapemax_shape_relations.push(subpaths);
	            for (j = 0; j < subpaths.length; j++) {
	                this.shape_shapemax_relations[subpaths[j]] = i;
	            }
	        }
	    }
	    Export() {
	        var i, j;
	        var exportmaxshape = [];
	        var shapeembedmask = [];
	        lstool.init(shapeembedmask, false, this.shapefinder.paths.length);
	        var inshapeids;
	        //max-loop
	        for (i = 0; i < this.shapemaxfinder.paths.length; i++) {
	            var grouppath = this.shapemaxfinder.paths[i];
	            var edges = [];
	            var headinfo = -10000;
	            for (j = 0; j < grouppath.egs.length; j++) { //把输出的分段零件组装回原始数据段
	                var edge = this.gs_formated.out.egs[grouppath.egs[j]];
	                if (headinfo == edge.reftag)
	                    continue; //过滤相同的数据段
	                headinfo = edge.reftag;
	                var eif = this.gs_formated.LocateEdgeByRefTag(edge.reftag);
	                edges.push({ 'id': this.edgeformatedtracker.egsid[eif.index], 'edge': this.gs_formated.egs[eif.index] });
	            }
	            inshapeids = [];
	            var inshape_indices = this.shapemax_shape_relations[i];
	            for (j = 0; j < inshape_indices.length; j++) {
	                inshapeids.push(this.shapetracker.pathsid[inshape_indices[j]]);
	            }
	            var exportshape = {};
	            exportshape['name'] = 'Shape Group';
	            exportshape['id'] = this.shapemaxtraccker.pathsid[i];
	            exportshape['edges'] = edges;
	            exportshape['ves'] = this.shapemaxfinder.vectorloops[i].ves;
	            exportshape['section'] = this.shapemaxfinder.vectorloops[i].sections;
	            exportshape['inshapeids'] = inshapeids;
	            exportmaxshape.push(exportshape);
	        }
	        var exportminshpape = [];
	        for (i = 0; i < this.shapefinder.paths.length; i++) {
	            var path = this.shapefinder.paths[i];
	            var edges = [];
	            var headinfo = -10000;
	            for (j = 0; j < path.egs.length; j++) {
	                var edge = this.gs_formated.out.egs[path.egs[j]];
	                if (headinfo == edge.reftag)
	                    continue;
	                headinfo = edge.reftag;
	                var eif = this.gs_formated.LocateEdgeByRefTag(edge.reftag);
	                edges.push({ 'id': this.edgeformatedtracker.egsid[eif.index], 'edge': this.gs_formated.egs[eif.index] });
	            }
	            var ember = this.shapefinder.hierarchy_shape_shape[i];
	            inshapeids = new Array();
	            for (j = 0; j < ember.length; j++) {
	                inshapeids.push(this.shapetracker.pathsid[ember[j]]);
	            }
	            var exportshape = {};
	            exportshape['name'] = 'Shape';
	            exportshape['id'] = this.shapetracker.pathsid[i];
	            exportshape['edges'] = edges;
	            exportshape['ves'] = this.shapefinder.vectorloops[i].ves;
	            exportshape['section'] = this.shapefinder.vectorloops[i].sections;
	            exportshape['inshapeids'] = inshapeids;
	            exportminshpape.push(exportshape);
	        }
	        var res = {};
	        res['source'] = this.gs;
	        res['formated'] = this.gs_formated;
	        var shapegroups = {};
	        shapegroups['name'] = 'Shapes Groups';
	        shapegroups['list'] = exportmaxshape;
	        shapegroups['ids'] = this.shapemaxtraccker.pathsid;
	        shapegroups['ids_removed'] = this.shapemaxtraccker.pathsid_remvoed;
	        shapegroups['ids_added'] = this.shapemaxtraccker.pathsid_added;
	        res['shapegroups'] = shapegroups;
	        var shapes = {};
	        shapes['name'] = 'Shapes';
	        shapes['list'] = exportminshpape;
	        shapes['ids'] = this.shapetracker.pathsid;
	        shapes['ids_removed'] = this.shapetracker.pathsid_remvoed;
	        shapes['ids_added'] = this.shapetracker.pathsid_added;
	        res['shapes'] = shapes;
	        res['edgeformatedids'] = this.edgeformatedtracker.egsid;
	        res['edgeformatedids_removed'] = this.edgeformatedtracker.egsdel_ids;
	        res['edgeformatedids_added'] = this.edgeformatedtracker.egsnew_ids;
	        res['edgeids'] = this.edgetracker.egsid;
	        res['edgeids_removed'] = this.edgetracker.egsdel_ids;
	        res['edgeids_added'] = this.edgetracker.egsnew_ids;
	        return res;
	    }
	    fromjson(str) {
	        this.clear();
	        var sh = new StringHelper(str);
	        var i;
	        var idss;
	        var id;
	        sh.Jump('egsid:');
	        idss = sh.ReadABContent('[', ']').split(',');
	        for (i = 0; i < idss.length; i++) {
	            if (idss[i].length == 0)
	                continue;
	            id = Number(idss[i]);
	            if (isNaN(id))
	                continue;
	            this.edgetracker.egsid.push(id);
	        }
	        sh.Jump('egsformatedid:');
	        idss = sh.ReadABContent('[', ']').split(',');
	        for (i = 0; i < idss.length; i++) {
	            if (idss[i].length == 0)
	                continue;
	            id = Number(idss[i]);
	            if (isNaN(id))
	                continue;
	            this.edgeformatedtracker.egsid.push(id);
	        }
	        sh.Jump('shapeid:');
	        idss = sh.ReadABContent('[', ']').split(',');
	        for (i = 0; i < idss.length; i++) {
	            if (idss[i].length == 0)
	                continue;
	            id = Number(idss[i]);
	            if (isNaN(id))
	                continue;
	            this.shapetracker.pathsid.push(id);
	        }
	        sh.Jump('groupid:');
	        idss = sh.ReadABContent('[', ']').split(',');
	        for (i = 0; i < idss.length; i++) {
	            if (idss[i].length == 0)
	                continue;
	            id = Number(idss[i]);
	            if (isNaN(id))
	                continue;
	            this.shapemaxtraccker.pathsid.push(id);
	        }
	    }
	    tojson(p = CalcConst.precision) {
	        var i;
	        var ans = '';
	        ans += '{';
	        ans += 'egsid:[';
	        for (i = 0; i < this.edgetracker.egsid.length; i++) {
	            ans += this.edgetracker.egsid[i] + ',';
	        }
	        ans += '],';
	        ans += 'egsformatedid:[';
	        for (i = 0; i < this.edgeformatedtracker.egsid.length; i++) {
	            ans += this.edgeformatedtracker.egsid[i] + ',';
	        }
	        ans += '],';
	        ans += 'shapeid:[';
	        for (i = 0; i < this.shapetracker.pathsid.length; i++) {
	            ans += this.shapetracker.pathsid[i] + ',';
	        }
	        ans += '],';
	        ans += 'groupid:[';
	        for (i = 0; i < this.shapemaxtraccker.pathsid.length; i++) {
	            ans += this.shapemaxtraccker.pathsid[i] + ',';
	        }
	        ans += ']';
	        ans += '}';
	        return ans;
	    }
	}

	let SupportEdgeClasses = /** @class */ (() => {
	    class SupportEdgeClasses {
	    }
	    SupportEdgeClasses.segment = 'Segment';
	    SupportEdgeClasses.poly = 'Poly';
	    SupportEdgeClasses.bezier = 'BezierCurvesPoly';
	    SupportEdgeClasses.arc = 'ArcCurvesPoly';
	    return SupportEdgeClasses;
	})();

	class DirPoint {
	    constructor(pos, w) {
	        this.pos = new float3();
	        this.dir = new float3();
	        this.pos.fill(pos);
	        this.dir.fill(w);
	    }
	    nearsq(value, rangesq) {
	        if (value == null)
	            return false;
	        return this.pos.nearequals(value.pos, rangesq) && this.dir.nearequals(value.dir, rangesq);
	    }
	    clone() {
	        return new DirPoint(this.pos.clone(), this.dir.clone());
	    }
	}

	class ExtrudeTool {
	    constructor(geometry, profile_model, matrix) {
	        this.raw_ves = [];
	        this.raw_lines = [];
	        this.hot_ves = [];
	        this.hot_egs = [];
	        this.gt = geometry;
	        this.raw_ves = profile_model.clone().ves;
	        this.raw_lines = profile_model.lines.concat();
	        var zero = matrix.mulvector(new float3());
	        var mR = matrix.clone();
	        mR.translate(zero.negate());
	        var i;
	        for (i = 0; i < this.raw_ves.length; i++) {
	            var v = this.raw_ves[i];
	            var p = matrix.mulvector(v.pos);
	            v.pos.fill(p);
	            v.normal.fill(mR.mulvector(v.normal).normalf());
	        }
	    }
	    static crosssection(dst, src, axis = new float3(0, 1, 0), epsilon = 0.001) {
	        dst.clear();
	        dst.copy(src);
	        dst.splite(null, axis.scale(-1));
	        dst.splite(null, axis);
	        dst.remove_empty();
	        var i;
	        for (i = 0; i < dst.triangles.length; i += 3) {
	            var a = dst.ves[dst.triangles[i + 0]].pos;
	            var b = dst.ves[dst.triangles[i + 1]].pos;
	            var c = dst.ves[dst.triangles[i + 2]].pos;
	            if (Math.abs(a.sub(b).dot(axis)) < epsilon
	                && a.dot(axis) > 0) {
	                dst.lines.push(dst.triangles[i + 0], dst.triangles[i + 1]);
	            }
	            if (Math.abs(b.sub(c).dot(axis)) < epsilon
	                && b.dot(axis) > 0) {
	                dst.lines.push(dst.triangles[i + 1], dst.triangles[i + 2]);
	            }
	            if (Math.abs(c.sub(a).dot(axis)) < epsilon
	                && c.dot(axis) > 0) {
	                dst.lines.push(dst.triangles[i + 2], dst.triangles[i + 0]);
	            }
	        }
	        for (i = 0; i < dst.ves.length; i++) {
	            dst.ves[i].pos = dst.ves[i].pos.cancel(axis);
	        }
	        dst.triangles.length = 0;
	        dst.simplify();
	    }
	    /**
	    *  . ------ .
	    *  path function need two extra dots at both end of the given route , so it can defind a cut-with-angle at the end of the pipe being generated.
	    *  this function simply add two dots to make an easy use.
	    */
	    static processroute(route) {
	        var out = new Array();
	        var isLoop = route[0].nearequals(route[route.length - 1], CalcConst.dis_err);
	        var i = 0;
	        var dir;
	        if (isLoop) {
	            out.push(lstool.at(route, -2));
	            for (i = 0; i < route.length; i++) {
	                out.push(route[i]);
	            }
	            out.push(route[1]);
	        }
	        else {
	            dir = float3.dir(route[0], route[1]);
	            out.push(route[0].sub(dir));
	            for (i = 0; i < route.length; i++) {
	                out.push(route[i]);
	            }
	            dir = float3.dir(route[route.length - 2], route[route.length - 1]);
	            out.push(route[route.length - 1].add(dir));
	        }
	        return out;
	    }
	    static ExtrudeRoute(output, profile_model, matrix, belt, travelFunction) {
	        var ge = new ExtrudeTool(output, profile_model, matrix);
	        output.triangles.length = 0;
	        var head;
	        var dir, dir1;
	        var ndir;
	        var side;
	        var cutn, cutn1;
	        var v, w, v1, w1;
	        belt = belt.concat();
	        head = 0;
	        if (belt[0].equals(lstool.at(belt, -2)) && belt[1].equals(lstool.at(belt, -1))) {
	            if (belt.length < 6)
	                return;
	            v = lstool.at(belt, -4);
	            v1 = lstool.at(belt, -3);
	            w = belt[0];
	            w1 = belt[1];
	            dir = w.sub(v).normal();
	            dir1 = belt[head + 2].sub(w).normal();
	            side = w1.sub(w).normal();
	            ndir = side.cross(dir);
	            cutn = dir.add(dir1).normal();
	            v = w;
	            belt.push(belt[2], belt[3]);
	        }
	        else {
	            if (belt.length < 4)
	                return;
	            v = lstool.at(belt, -4);
	            w = lstool.at(belt, -2);
	            w1 = lstool.at(belt, -1);
	            dir = w.sub(v).normal();
	            belt.push(w.add(dir), w1.add(dir));
	            v = belt[head + 0];
	            v1 = belt[head + 1];
	            w = belt[head + 2];
	            w1 = belt[head + 3];
	            dir = w.sub(v).normal();
	            side = v1.sub(v).normal();
	            ndir = side.cross(dir);
	            cutn = dir;
	        }

            if(profile_model.isLoop){
                head=0
                v = belt[head + 0];
                v1 = belt[head + 1];
                w = belt[head + 2];
                w1 = belt[head + 3];

                dir = w.sub(v).normal();
                if (dir.lengthSq < CalcConst.dot_err)
                    return;
                dir1 = belt[head + 4].sub(w).normal();
                side = v1.sub(v).normal();
              let  cutn = dir.add(dir1).normal();
                //ge.Extrude(dir, ndir, w, travelFunction, cutn);
               // ge.Copy();
                cutn1 = VectorCalc.reflection(cutn, dir);
                    ge.ProjectTexcordToPlane(dir, new Ray(w, cutn1), travelFunction);

                if (Math.abs(dir.dot(dir1)) < 1 - CalcConst.nearzero) {
                    var tensor = new tensor3();
                    var axis = dir.cross(dir1).normal();
                    tensor.rotate(VectorCalc.angle(dir, dir1, axis), axis);
                    ndir = tensor.mulvector(ndir);
                }
			}
            ge.Init(dir, ndir, v, travelFunction, cutn);

	        for (head = 0; head <= belt.length - 6; head += 2) {
	            v = belt[head + 0];
	            v1 = belt[head + 1];
	            w = belt[head + 2];
	            w1 = belt[head + 3];
	            dir = w.sub(v).normal();
	            if (dir.lengthSq < CalcConst.dot_err)
	                return;
	            dir1 = belt[head + 4].sub(w).normal();
	            side = v1.sub(v).normal();
	            cutn = dir.add(dir1).normal();
	            ge.Extrude(dir, ndir, w, travelFunction, cutn);
	            ge.Copy();
	            cutn1 = VectorCalc.reflection(cutn, dir);
	             let aa =1
	            if(aa ==1){
                    ge.ProjectTexcordToPlane(dir, new Ray(w, cutn1), travelFunction);
				}

	            if (Math.abs(dir.dot(dir1)) < 1 - CalcConst.nearzero) {
	                var tensor = new tensor3();
	                var axis = dir.cross(dir1).normal();
	                tensor.rotate(VectorCalc.angle(dir, dir1, axis), axis);
	                ndir = tensor.mulvector(ndir);
	            }
	        }
	        ge.Finish();
	    }
	    static ExtrudeRoute_LockUp(output, profile_model, matrix, belt, travelFunction) {
	        var ge = new ExtrudeTool(output, profile_model, matrix);
	        output.triangles.length = 0;
	        var head;
	        var dir, dir1;
	        var ndir;
	        var side;
	        var cutn, cutn1;
	        var v, w, v1, w1;
	        belt = belt.concat();
	        head = 0;
	        if (belt[0].equals(lstool.at(belt, -2)) && belt[1].equals(lstool.at(belt, -1))) {
	            if (belt.length < 6)
	                return;
	            v = lstool.at(belt, -4);
	            v1 = lstool.at(belt, -3);
	            w = belt[0];
	            w1 = belt[1];
	            dir = w.sub(v).normal();
	            dir1 = belt[head + 2].sub(w).normal();
	            side = w1.sub(w).normal();
	            ndir = side.cross(dir);
	            cutn = dir.add(dir1).normal();
	            v = w;
	            belt.push(belt[2], belt[3]);
	        }
	        else {
	            if (belt.length < 4)
	                return;
	            v = lstool.at(belt, -4);
	            w = lstool.at(belt, -2);
	            w1 = lstool.at(belt, -1);
	            dir = w.sub(v).normal();
	            belt.push(w.add(dir), w1.add(dir));
	            v = belt[head + 0];
	            v1 = belt[head + 1];
	            w = belt[head + 2];
	            w1 = belt[head + 3];
	            dir = w.sub(v).normal();
	            side = v1.sub(v).normal();
	            ndir = side.cross(dir);
	            cutn = dir;
	        }
	        ge.Init(dir, ndir, v, travelFunction, cutn);
	        for (head = 0; head <= belt.length - 6; head += 2) {
	            v = belt[head + 0];
	            v1 = belt[head + 1];
	            w = belt[head + 2];
	            w1 = belt[head + 3];
	            dir = w.sub(v).normal();
	            if (dir.lengthSq < CalcConst.dot_err)
	                return;
	            dir1 = belt[head + 4].sub(w).normal();
	            side = v1.sub(v).normal();
	            ndir = side.cross(dir);
	            cutn = dir.add(dir1).normal();
	            ge.Extrude(dir, ndir, w, travelFunction, cutn);
	            ge.Copy();
	            cutn1 = VectorCalc.reflection(cutn, dir);
	            ge.ProjectTexcordToPlane(dir, new Ray(w, cutn1), travelFunction);
	        }
	        ge.Finish();
	    }
	    selectEdges(edges = null) {
	        if (edges == null) {
	            this.hot_egs = new Array();
	            for (var i = 0; i < this.gt.lines.length; i += 2) {
	                this.hot_egs.push(i);
	            }
	        }
	        else {
	            this.hot_egs = edges;
	        }
	        this.updateHotVertices();
	    }
	    Finish() {
	        var selectedves = [];
	        lstool.init(selectedves, false, this.gt.ves.length);
	        var i;
	        for (i = 0; i < this.hot_egs.length; i++) {
	            var edgeid = this.hot_egs[i];
	            var ia = this.gt.lines[edgeid + 0];
	            var ib = this.gt.lines[edgeid + 1];
	            selectedves[ia] = true;
	            selectedves[ib] = true;
	        }
	        for (i = this.gt.ves.length - 1; i >= 0; i--) {
	            if (!selectedves[i])
	                break;
	            this.gt.ves.pop();
	        }
	        this.gt.lines.length = 0;
	    }
	    Copy() {
	        var i = 0;
	        var a;
	        var b;
	        var ia;
	        var ib;
	        var ic;
	        var id;
	        if (this.hot_egs == null)
	            return;
	        var verticesMapping = new Array();
	        for (i = 0; i < this.gt.ves.length; i++) {
	            verticesMapping.push(-1);
	        }
	        var newEdges = new Array();
	        for (i = 0; i < this.hot_egs.length; i++) {
	            var index = this.hot_egs[i];
	            ia = this.gt.lines[index + 0];
	            ib = this.gt.lines[index + 1];
	            a = this.gt.ves[ia];
	            b = this.gt.ves[ib];
	            if (verticesMapping[ia] < 0) {
	                verticesMapping[ia] = this.gt.ves.push(a.clone()) - 1;
	            }
	            if (verticesMapping[ib] < 0) {
	                verticesMapping[ib] = this.gt.ves.push(b.clone()) - 1;
	            }
	            ic = verticesMapping[ia];
	            id = verticesMapping[ib];
	            newEdges.push(this.gt.lines.length);
	            this.gt.lines.push(ic);
	            this.gt.lines.push(id);
	        }
	        this.hot_egs = newEdges;
	        this.updateHotVertices();
	    }
	    updateHotVertices() {
	        var i = 0;
	        var selectedves = [];
	        lstool.init(selectedves, false, this.gt.ves.length);
	        for (i = 0; i < this.hot_egs.length; i++) {
	            var edgeid = this.hot_egs[i];
	            var ia = this.gt.lines[edgeid + 0];
	            var ib = this.gt.lines[edgeid + 1];
	            selectedves[ia] = true;
	            selectedves[ib] = true;
	        }
	        this.hot_ves.length = 0;
	        for (i = 0; i < selectedves.length; i++) {
	            if (!selectedves[i])
	                continue;
	            this.hot_ves.push(i);
	        }
	    }
	    /**
	     * @param travelFunction   (vertex,targetpos,dir);
	     */
	    ProjectVerticesToPlane(toward, ray, travelFunction) {
	        var i = 0;
	        var ndir = toward.negate();
	        for (i = 0; i < this.hot_ves.length; i++) {
	            var a = this.gt.ves[this.hot_ves[i]];
	            var toPos = VectorCalc.rayCrossPlane(new Ray(a.pos, toward), ray.pos, ray.dir, CalcConst.dis_err, true);
	            travelFunction(a, toPos, ndir);
	            a.pos = toPos;
	        }
	    }
	    ProjectTexcordToPlane(toward, ray, travelFunction) {
	        var i = 0;
	        for (i = 0; i < this.hot_ves.length; i++) {
	            var a = this.gt.ves[this.hot_ves[i]];
	            var toPos = VectorCalc.rayCrossPlane(new Ray(a.pos, toward), ray.pos, ray.dir, CalcConst.dis_err, true);
	            travelFunction(a, toPos, toward);
	        }
	    }
	    Init(forward, up, position, travelFunction, cut_normal) {
	        var i;
	        var raw_vertex, v, w;
	        var t = tensor3.createByAxisYZ(forward, forward.cross(up).cross(forward).normal());
	        for (i = 0; i < this.raw_ves.length; i++) {
	            raw_vertex = this.raw_ves[i];
	            w = raw_vertex.clone();
	            w.pos = t.mulvector(w.pos).add(position);
	            this.gt.ves.push(w);
	            var toPos;
	            toPos = VectorCalc.rayCrossPlane(new Ray(w.pos, forward), position, cut_normal, CalcConst.dis_err, true);
	            travelFunction(w, toPos, forward);
	            w.pos = toPos;
	            w.normal = t.mulvector(w.normal);
	        }
	        var new_egs = new Array();
	        var edgeid;
	        var ia, ib;
	        for (i = 0; i < this.raw_lines.length; i += 2) {
	            edgeid = i;
	            ia = this.raw_lines[edgeid + 0];
	            ib = this.raw_lines[edgeid + 1];
	            v = this.gt.ves[ia];
	            w = this.gt.ves[ib];
	            this.gt.lines.push(ia);
	            this.gt.lines.push(ib);
	            new_egs.push(edgeid);
	        }
	        this.hot_egs = new_egs;
	        this.selectEdges();
	        this.updateHotVertices();
	    }
	    Extrude(forward, up, position, travelFunction, cut_normal) {
	        var i;
	        var raw_vertex, v, w;
	        var new_indices = new Array();
	        var t = tensor3.createByAxisYZ(forward, forward.cross(up).cross(forward).normal());
	        for (i = 0; i < this.raw_ves.length; i++) {
	            raw_vertex = this.raw_ves[i];
	            v = this.gt.ves[this.hot_ves[i]];
	            w = raw_vertex.clone();
	            w.pos = t.mulvector(w.pos).add(position);
	            w.uv = v.uv.clone();
	            this.gt.ves.push(w);
	            new_indices[this.hot_ves[i]] = this.gt.ves.length - 1;
	            var toPos;
	            toPos = VectorCalc.rayCrossPlane(new Ray(w.pos, forward), position, cut_normal, CalcConst.dis_err, true);
	            w.pos = v.pos;
	            travelFunction(w, toPos, forward);
	            w.pos = toPos;
	            w.normal = t.mulvector(w.normal);
	            v.normal = w.normal.clone();
	        }
	        var new_egs = new Array();
	        var edgeid;
	        var ia, ib, ic, id;
	        var c, d;
	        var ab, bc, cd;
	        for (i = 0; i < this.hot_egs.length; i++) {
	            edgeid = this.hot_egs[i];
	            ia = this.gt.lines[edgeid + 0];
	            ib = this.gt.lines[edgeid + 1];
	            ic = new_indices[ia];
	            id = new_indices[ib];
	            v = this.gt.ves[ia];
	            w = this.gt.ves[ib];
	            c = this.gt.ves[ic];
	            d = this.gt.ves[id];
	            ab = w.pos.sub(v.pos);
	            bc = c.pos.sub(w.pos);
	            cd = d.pos.sub(c.pos);
	            if (ab.cross(bc).dot(v.normal) > 0) {
	                this.gt.triangles.push(ia, ib, ic);
	            }
	            else {
	                this.gt.triangles.push(ic, ib, ia);
	            }
	            if (bc.cross(cd).dot(v.normal) >= 0) {
	                this.gt.triangles.push(ib, ic, id);
	            }
	            else {
	                this.gt.triangles.push(ib, id, ic);
	            }
	            edgeid = this.gt.lines.length;
	            this.gt.lines.push(ic);
	            this.gt.lines.push(id);
	            new_egs.push(edgeid);
	        }
	        this.hot_egs = new_egs;
	        this.updateHotVertices();
	    }
	}

	class VertexData {
	    constructor() {
	        this.pos = new float3();
	        this.normal = new float3();
	        this.uv = new float2();
	    }
	    clone() {
	        var res = new VertexData();
	        res.pos = this.pos.clone();
	        res.normal = this.normal.clone();
	        res.uv = this.uv.clone();
	        return res;
	    }
	}
	class MeshData {
	    constructor() {
	        this.ves = new Array();
	        this.lines = new Array();
	        this.triangles = new Array();
	        this.surfaces = new Array();
	        this.boxbound = new BoxBound();
	    }
	    applyMatrix(matrix) {
	        var i = 0;
	        var zero = matrix.mulvector(new float3());
	        var mR = matrix.clone();
	        mR.translate(zero.negate());
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            var p = matrix.mulvector(v.pos);
	            v.pos.fill(p);
	            v.normal.fill(mR.mulvector(v.normal).normalf());
	        }
	    }
	    BuildBoxBound() {
	        if (this.ves.length < 1) {
	            this.boxbound = new BoxBound();
	            return;
	        }
	        var min = this.ves[0].pos.clone();
	        var max = this.ves[0].pos.clone();
	        for (var i = 0; i < this.ves.length; i++) {
	            var pos = this.ves[i].pos;
	            min.x = Math.min(pos.x, min.x);
	            min.y = Math.min(pos.y, min.y);
	            min.z = Math.min(pos.z, min.z);
	            max.x = Math.max(pos.x, max.x);
	            max.y = Math.max(pos.y, max.y);
	            max.z = Math.max(pos.z, max.z);
	        }
	        this.boxbound = BoxBound.CreateWithMinMax(min, max);
	    }
	    clone() {
	        var res = new MeshData();
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            res.ves.push(this.ves[i].clone());
	        }
	        res.lines = this.lines.concat();
	        res.triangles = this.triangles.concat();
	        res.surfaces = this.surfaces.concat();
	        return res;
	    }
	    clear() {
	        this.ves.length = 0;
	        this.lines.length = 0;
	        this.triangles.length = 0;
	    }
	    copy(src) {
	        var i;
	        this.clear();
	        for (i = 0; i < src.ves.length; i++) {
	            this.ves.push(src.ves[i].clone());
	        }
	        this.lines = src.lines.concat();
	        this.triangles = src.triangles.concat();
	    }
	    simplify() {
	        var vesbinding = new Array();
	        var i = 0;
	        var newves = new Array();
	        for (i = 0; i < this.ves.length; i++) {
	            vesbinding.push(-1);
	        }
	        var index = 0;
	        for (i = 0; i < this.triangles.length; i++) {
	            index = this.triangles[i];
	            if (vesbinding[index] < 0) {
	                vesbinding[index] = newves.push(this.ves[index]) - 1;
	            }
	            this.triangles[i] = vesbinding[index];
	        }
	        for (i = 0; i < this.lines.length; i++) {
	            index = this.lines[i];
	            if (vesbinding[index] < 0) {
	                vesbinding[index] = newves.push(this.ves[index]) - 1;
	            }
	            this.lines[i] = vesbinding[index];
	        }
	        this.ves = newves;
	    }
	    remove_empty() {
	        var i = 0;
	        for (i = this.triangles.length - 3; i >= 0; i -= 3) {
	            var a = this.ves[this.triangles[i + 0]];
	            var b = this.ves[this.triangles[i + 1]];
	            var c = this.ves[this.triangles[i + 2]];
	            var up = b.pos.sub(a.pos).crossnormalize(c.pos.sub(b.pos));
	            if (up.lengthSq == 0) {
	                this.triangles.splice(i, 3);
	            }
	        }
	    }
	    splite(dst, normal, epsilon = 0.0001) {
	        var mask = new Array();
	        var i;
	        for (i = 0; i < this.ves.length; i++) {
	            mask[i] = -1;
	        }
	        for (i = this.triangles.length - 3; i >= 0; i -= 3) {
	            var a = this.ves[this.triangles[i + 0]];
	            var b = this.ves[this.triangles[i + 1]];
	            var c = this.ves[this.triangles[i + 2]];
	            var up = b.pos.sub(a.pos).crossnormalize(c.pos.sub(b.pos));
	            if (up.dot(normal) > 1 - CalcConst.nearzero) {
	                if (dst != null) {
	                    if (mask[this.triangles[i + 0]] < 0) {
	                        mask[this.triangles[i + 0]] = dst.ves.push(this.ves[this.triangles[i + 0]].clone()) - 1;
	                    }
	                    if (mask[this.triangles[i + 1]] < 0) {
	                        mask[this.triangles[i + 1]] = dst.ves.push(this.ves[this.triangles[i + 1]].clone()) - 1;
	                    }
	                    if (mask[this.triangles[i + 2]] < 0) {
	                        mask[this.triangles[i + 2]] = dst.ves.push(this.ves[this.triangles[i + 2]].clone()) - 1;
	                    }
	                    dst.triangles.push(mask[this.triangles[i + 0]], mask[this.triangles[i + 1]], mask[this.triangles[i + 2]]);
	                }
	                this.triangles.splice(i, 3);
	            }
	        }
	        for (i = this.lines.length - 2; i >= 0; i -= 2) {
	            a = this.ves[this.lines[i + 0]];
	            b = this.ves[this.lines[i + 1]];
	            up = a.normal;
	            if (up.dot(normal) > 1 - CalcConst.nearzero) {
	                if (dst != null) {
	                    if (mask[this.lines[i + 0]] < 0) {
	                        mask[this.lines[i + 0]] = dst.ves.push(this.ves[this.lines[i + 0]].clone()) - 1;
	                    }
	                    if (mask[this.lines[i + 1]] < 0) {
	                        mask[this.lines[i + 1]] = dst.ves.push(this.ves[this.lines[i + 1]].clone()) - 1;
	                    }
	                    dst.lines.push(mask[this.lines[i + 0]], mask[this.lines[i + 1]]);
	                }
	                this.lines.splice(i, 2);
	            }
	        }
	    }
	}

	class MeshDataOutTHREE {
	    static WriteToBuffer(meshdata) {
	        var indices = [];
	        var vertices = [];
	        var normals = [];
	        var uvs = [];
	        var res = new THREE.BufferGeometry();
	        var i;
	        for (i = 0; i < meshdata.ves.length; i++) {
	            var p = meshdata.ves[i];
	            vertices.push(p.pos.x, p.pos.y, p.pos.z);
	            normals.push(p.normal.x, p.normal.y, p.normal.z);
	            uvs.push(p.uv.x, p.uv.y);
	        }
	        indices = meshdata.triangles.concat();
	        res.setIndex(indices);
	        res.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	        res.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
	        res.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	        return res;
	    }
	}

	class GeometryDataOutput {
	    static WriteToBuffer(geom) {
	        var indices = [];
	        var vertices = [];
	        var normals = [];
	        var uvs = [];
	        var res = new THREE.BufferGeometry();
	        var i;
	        for (i = 0; i < geom.ves.length; i++) {
	            var vd = geom.ves[i];
	            vertices.push(vd.pos.x, vd.pos.y, vd.pos.z);
	            normals.push(vd.normal.x, vd.normal.y, vd.normal.z);
	            uvs.push(vd.uv.x, vd.uv.y);
	        }
	        for (i = 0; i < geom.triangles.length; i++) {
	            indices.push(geom.triangles[i]);
	        }
	        res.addGroup(0, geom.triangles.length, 0);
	        res.setIndex(indices);
	        res.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	        res.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
	        res.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	        return res;
	    }
	}

	class GeometrySurface {
	    constructor() {
	        this.indices = new Array();
	        this.sections = new Array();
	        this.color = 0;
	        this.optag = null;
	        this.center = null;
	        this.radius = 0;
	    }
	    angleBaseContainPoint(ves, point) {
	        var i;
	        var angle_sum = 0;
	        var sta = this.sections[0];
	        var len = this.sections[1] - this.sections[0];
	        for (i = 0; i < len; i++) {
	            var v0 = ves[this.indices[sta + i]];
	            var v1 = ves[this.indices[sta + (i + 1) % len]];
	            angle_sum += VectorCalc.angle(v0.sub(point), v1.sub(point), this.normal);
	        }
	        return Math.abs(angle_sum) >= Math.PI * 2 - CalcConst.nearzero;
	    }
	    addShape(ves, shape) {
	        var id = ves.length;
	        if (this.sections.length == 0)
	            this.sections.push(0);
	        for (var i = 0; i < shape.ves.length; i++) {
	            ves.push(shape.ves[i]);
	        }
	        var iid = this.indices.length;
	        for (var i = id; i < ves.length; i++) {
	            this.indices.push(i);
	        }
	        this.sections.push(this.indices.length);
	    }
	    gvec(ves, index) {
	        return ves[this.indices[index]];
	    }
	    CalculateCenter(ves) {
	        var scale = 1 / this.indices.length;
	        var sum = new float3();
	        for (var i = 0; i < this.indices.length; i++) {
	            sum = sum.advance(this.gvec(ves, i), scale);
	        }
	        this.center = sum;
	    }
	    CalculateRadius(ves) {
	        var best_dis = 0;
	        for (var i = 0; i < this.indices.length; i++) {
	            var p = this.gvec(ves, i);
	            var dis = p.sub(this.center).lengthSq;
	            if (best_dis < dis) {
	                best_dis = dis;
	            }
	        }
	        this.radius = Math.sqrt(best_dis);
	    }
	    containPoint(ves, point, distance_error = 0.0001, jump_radian = 0.017444) {
	        var v0 = this.gvec(ves, this.sections[0]);
	        var v1 = this.gvec(ves, this.sections[0] + 1);
	        var dot = Math.abs(point.sub(v0).dot(this.normal));
	        if (dot > distance_error) {
	            return 0;
	        }
	        if (point.sub(this.center).length > this.radius + distance_error)
	            return 0;
	        var ray = new Ray(point, float3.lerp(v0, v1, 0.5).sub(point).normal());
	        var rot = tensor3.eular(this.normal.scale(jump_radian)); // jump some angle
	        var check = true;
	        while (check) {
	            var count0 = 0;
	            var count1 = 0;
	            ray.dir = rot.mulvector(ray.dir);
	            ray.dir = ray.dir.cancel(this.normal);
	            check = false;
	            for (var i = 0; i < this.sections.length - 1; i++) {
	                var s0 = this.sections[i];
	                var s1 = this.sections[i + 1];
	                var slen = s1 - s0;
	                for (var j = 0; j < slen; j++) {
	                    var a = this.gvec(ves, s0 + j + 0);
	                    var b = this.gvec(ves, s0 + ((j + 1) % slen));
	                    var ab = b.sub(a);
	                    var Nab = ab.normal();
	                    var sab = ab.dot(Nab);
	                    var ap = point.sub(a);
	                    var sap = ap.dot(Nab);
	                    if (Math.abs(Nab.cross(this.normal).dot(ap)) < distance_error && MathCalc.betweenEqual(sap, 0 - distance_error, sab + distance_error)) {
	                        if (Math.abs(sap - 0) < distance_error || Math.abs(sap - sab) < distance_error) {
	                            return 7;
	                        }
	                        return 3;
	                    }
	                    else {
	                        var hit = VectorCalc.rayCrossSegment(ray, a, b, distance_error, true);
	                        if (hit != null) {
	                            if (hit.nearequals(a, distance_error) || hit.nearequals(b, distance_error)) {
	                                check = true;
	                                break;
	                            }
	                            var dis = hit.sub(point).dot(ray.dir);
	                            if (dis > 0) {
	                                count0++;
	                            }
	                            else {
	                                count1++;
	                            }
	                        }
	                    }
	                }
	            }
	            if (check) {
	                continue;
	            }
	            if (count0 % 2 == 1 && count1 % 2 == 1)
	                return 1;
	            return 0;
	        }
	        return 0;
	    }
	    _add_index(id) {
	        for (var i = 0; i < this.indices.length; i++) {
	            if (this.indices[i] == id)
	                return;
	        }
	        this.indices.push(id);
	    }
	    toString(precision = 4) {
	        var result = "";
	        var endl = "\n";
	        result += "GeometrySurface(" + endl;
	        result += "normal:" + this.normal.toString() + endl;
	        result += "indices:" + this.indices.join() + endl;
	        result += "sections:" + this.sections.join() + endl;
	        result += ")" + endl;
	        return result;
	    }
	    fromString(value) {
	        var sh = new StringHelper(value);
	        var endl = "\n";
	        if (sh.ReadABContent("GeometrySurface(", endl) == null)
	            return;
	        this.normal = float3.fromString(sh.ReadABContent("normal:", endl));
	        var i = 0;
	        var r_indices = sh.ReadABContent("indices:", endl).split(",");
	        for (i = 0; i < r_indices.length; i++) {
	            if (StringHelper.isNull(r_indices[i]))
	                break;
	            this.indices.push(Number(r_indices[i]));
	        }
	        var r_sections = sh.ReadABContent("sections", endl).split(",");
	        for (i = 0; i < r_sections.length; i++) {
	            if (StringHelper.isNull(r_sections[i]))
	                break;
	            this.sections.push(Number(r_sections[i]));
	        }
	    }
	    clone() {
	        var r = new GeometrySurface();
	        r.indices = this.indices.concat();
	        r.sections = this.sections.concat();
	        r.normal = this.normal.clone();
	        return r;
	    }
	    Combine(surface) {
	        var i = 0;
	        var ia = 0;
	        var head0 = new float2();
	        var foundHead = false;
	        var indices1 = surface.indices.concat();
	        for (i = 0; i < this.indices.length; i++) {
	            foundHead = false;
	            if (!surface._has_index(this.indices[i])) {
	                head0.y = i;
	                foundHead = true;
	            }
	            if (foundHead) {
	                break;
	            }
	        }
	        if (!foundHead)
	            return false;
	        for (i = head0.y + 1; i < head0.y + this.indices.length; i++) {
	            ia = (i) % this.indices.length;
	            if (surface._has_index(this.indices[ia])) {
	                head0.y = ia;
	                break;
	            }
	        }
	        var head1 = new float2();
	        head1.x = this._get_order_by_value(indices1, this.indices[head0.y]);
	        if (head1.x == Number.MAX_VALUE) {
	            return false;
	        }
	        var foundEnd = false;
	        for (i = head1.x + 1; i < head1.x + indices1.length; i++) {
	            ia = (i) % indices1.length;
	            if (this._has_index(indices1[ia])) {
	                head1.y = ia;
	                head0.x = this._get_order_by_value(this.indices, indices1[ia]);
	                foundEnd = true;
	                break;
	            }
	        }
	        if (!foundEnd)
	            return false;
	        if (head0.x == head0.y)
	            return false;
	        var new_indicse = new Array();
	        for (i = head0.x; i < head0.x + this.indices.length; i++) {
	            ia = (i) % this.indices.length;
	            if (ia == head0.y) {
	                break;
	            }
	            new_indicse.push(this.indices[ia]);
	        }
	        for (i = head1.x; i < head1.x + indices1.length; i++) {
	            ia = (i) % indices1.length;
	            if (ia == head1.y) {
	                break;
	            }
	            new_indicse.push(indices1[ia]);
	        }
	        this.indices = new_indicse;
	        this.sections.length = 0;
	        this.sections.push(0, this.indices.length);
	        return true;
	    }
	    _get_order_by_value(list, index) {
	        for (var i = 0; i < list.length; i++) {
	            if (index == list[i]) {
	                return i;
	            }
	        }
	        return Number.MAX_VALUE;
	    }
	    _has_index(index) {
	        for (var i = 0; i < this.indices.length; i++) {
	            if (index == this.indices[i]) {
	                return true;
	            }
	        }
	        return false;
	    }
	}

	class GeometryModifier {
	    GeometryModifier() {
	    }
	    move(value) {
	        var vesmap = new Array();
	        vesmap.length = this.geom.ves.length;
	        var i, j;
	        var surf;
	        for (i = 0; i < this.surfs.length; i++) {
	            surf = this.surfs[i];
	            for (j = 0; j < surf.indices.length; j++) {
	                vesmap[surf.indices[j]] = true;
	            }
	        }
	        for (i = 0; i < this.geom.ves.length; i++) {
	            if (vesmap[i] == true) {
	                this.geom.ves[i] = this.geom.ves[i].add(value);
	            }
	        }
	        for (i = 0; i < this.geom.surfaces.length; i++) { // calculate normals;
	            surf = this.geom.surfaces[i];
	            if (surf.indices.length >= 3) {
	                var v0 = this.geom.ves[surf.indices[0]];
	                var v1 = this.geom.ves[surf.indices[1]];
	                var v2 = this.geom.ves[surf.indices[2]];
	                surf.normal = v1.sub(v0).cross(v2.sub(v1)).normal();
	                var outpos = float3.lerp(v0, v1, 0.5).add(v1.sub(v0).cross(surf.normal).normal().scale(CalcConst.dis_err));
	                if (surf.angleBaseContainPoint(this.geom.ves, outpos)) {
	                    surf.normal = surf.normal.negate();
	                }
	            }
	        }
	    }
	    extrude() {
	        var vesmap = new Array();
	        vesmap.length = this.geom.ves.length;
	        var i, j;
	        var surf;
	        var idx;
	        var v, w;
	        for (i = 0; i < vesmap.length; i++) {
	            vesmap[i] = -1;
	        }
	        for (i = 0; i < this.surfs.length; i++) {
	            surf = this.surfs[i];
	            for (j = 0; j < surf.indices.length; j++) {
	                idx = surf.indices[j];
	                if (vesmap[idx] < 0) {
	                    vesmap[idx] = this.geom.ves.length;
	                    this.geom.ves.push(this.geom.ves[idx].clone());
	                }
	            }
	        }
	        var surfs1 = new Array();
	        var surf1;
	        for (i = 0; i < this.surfs.length; i++) {
	            surf = this.surfs[i];
	            surf1 = new GeometrySurface();
	            for (j = 0; j < surf.indices.length; j++) {
	                surf1.indices.push(vesmap[surf.indices[j]]);
	            }
	            surf1.normal = surf.normal.clone();
	            surf1.sections = surf.sections.concat();
	            surfs1.push(surf1);
	        }
	        var egs = this.find_edges_out();
	        for (j = 0; j < egs.length - 1; j += 2) {
	            surf1 = new GeometrySurface();
	            v = this.geom.ves[egs[j]];
	            w = this.geom.ves[egs[j + 1]];
	            surf1.indices.push(egs[j], egs[j + 1], vesmap[egs[j + 1]], vesmap[egs[j]]);
	            surf1.normal = w.sub(v).cross(surf.normal).normal();
	            surf1.sections.push(0, 4);
	            surfs1.push(surf1);
	        }
	        for (i = 0; i < this.surfs.length; i++) {
	            for (j = 0; j < this.geom.surfaces.length; j++) {
	                if (this.surfs[i] == this.geom.surfaces[j]) {
	                    this.geom.surfaces.splice(j, 1);
	                    break;
	                }
	            }
	        }
	        this.surfs.length = 0;
	        lstool.attach(this.geom.surfaces, surfs1);
	    }
	    find_edges_out() {
	        var i, j, k;
	        var surf;
	        var s0, s1;
	        var egs = new Array();
	        for (i = 0; i < this.surfs.length; i++) {
	            surf = this.surfs[i];
	            for (j = 0; j < surf.sections.length - 1; j++) {
	                s0 = surf.sections[j + 0];
	                s1 = surf.sections[j + 1];
	                for (k = s0; k < s1 - 1; k++) {
	                    egs.push(surf.indices[k], surf.indices[k + 1]);
	                }
	                egs.push(surf.indices[s1 - 1], surf.indices[s0]);
	            }
	        }
	        var p0, p1, q0, q1;
	        var found;
	        for (i = 0; i < egs.length - 1; i += 2) {
	            found = false;
	            p0 = egs[i + 0];
	            p1 = egs[i + 1];
	            if (p0 == p1) {
	                egs.splice(i, 2);
	                i -= 2;
	                continue;
	            }
	            for (j = i + 2; j < egs.length - 1; j += 2) {
	                q0 = egs[j + 0];
	                q1 = egs[j + 1];
	                if ((p0 - q0) * (p0 - q1) == 0 && (p1 - q0) * (p1 - q1) == 0) {
	                    egs.splice(j, 2);
	                    j -= 2;
	                    found = true;
	                }
	            }
	            if (found) {
	                egs.splice(i, 2);
	                i -= 2;
	                continue;
	            }
	        }
	        return egs;
	    }
	}

	class tensor3t {
	    //  0 1 2 
	    //  3 4 5
	    //  6 7 8
	    constructor() {
	        this.el = new Array();
	        this.t = new Array();
	        this.el.length = 9;
	        this.el[0] = 1;
	        this.el[1] = 0;
	        this.el[2] = 0;
	        this.el[3] = 0;
	        this.el[4] = 1;
	        this.el[5] = 0;
	        this.el[6] = 0;
	        this.el[7] = 0;
	        this.el[8] = 1;
	        this.t.length = 3;
	        this.t[0] = 0;
	        this.t[1] = 0;
	        this.t[2] = 0;
	    }
	    transpose() {
	        var t;
	        // 0 1 2
	        // 3 4 5
	        // 6 7 8
	        t = this.el[1];
	        this.el[1] = this.el[3];
	        this.el[3] = t;
	        t = this.el[2];
	        this.el[2] = this.el[6];
	        this.el[6] = t;
	        t = this.el[5];
	        this.el[5] = this.el[7];
	        this.el[7] = t;
	    }
	    get_axis(row) {
	        return new float3(this.el[0 * 3 + row], this.el[1 * 3 + row], this.el[2 * 3 + row]);
	    }
	    set_axis(row, value) {
	        this.el[0 * 3 + row] = value.x;
	        this.el[1 * 3 + row] = value.y;
	        this.el[2 * 3 + row] = value.z;
	    }
	    static fromToMatrix(a, b) {
	        return a.invert().mulmatrix(b);
	    }
	    selem(row, column, value) {
	        this.el[row * 3 + column] = value;
	    }
	    gelem(row, column) {
	        return this.el[row * 3 + column];
	    }
	    static eular(value) {
	        var ans = new tensor3t();
	        ans.rotateX(value.x);
	        ans.rotateY(value.y);
	        ans.rotateZ(value.z);
	        return ans;
	    }
	    rotateX(eular) {
	        this.rotate(eular, new float3(1, 0, 0));
	    }
	    rotateY(eular) {
	        this.rotate(eular, new float3(0, 1, 0));
	    }
	    rotateZ(eular) {
	        this.rotate(eular, new float3(0, 0, 1));
	    }
	    translate(value) {
	        this.t[0] += value.x;
	        this.t[1] += value.y;
	        this.t[2] += value.z;
	    }
	    scale(value) {
	        if (value instanceof float3) {
	            this.el[0] *= value.x;
	            this.el[4] *= value.y;
	            this.el[8] *= value.z;
	        }
	        else if (typeof (value) == "number") {
	            this.el[0] *= value;
	            this.el[4] *= value;
	            this.el[8] *= value;
	        }
	    }
	    static createScale(scale) {
	        var value = new tensor3t();
	        value.scale(scale);
	        return value;
	    }
	    static createByAxisYZ(ny, nz) {
	        var nx = ny.cross(nz);
	        var value = new tensor3t();
	        value.set_axis(0, nx);
	        value.set_axis(1, ny);
	        value.set_axis(2, nz);
	        return value;
	    }
	    static indenty() {
	        var ans = new tensor3t();
	        ans.el[0] = 1;
	        ans.el[1] = 0;
	        ans.el[2] = 0;
	        ans.el[3] = 0;
	        ans.el[4] = 1;
	        ans.el[5] = 0;
	        ans.el[6] = 0;
	        ans.el[7] = 0;
	        ans.el[8] = 1;
	        ans.t[0] = 0;
	        ans.t[1] = 0;
	        ans.t[2] = 0;
	        return ans;
	    }
	    _inner_mulmatrix(row, value, column) {
	        var sum = 0;
	        for (var i = 0; i < 3; i++) {
	            sum += this.el[(row * 3) + i] * value.el[(i * 3) + column];
	        }
	        return sum;
	    }
	    mulmatrix(value) {
	        var ans = new tensor3t();
	        for (var i = 0; i < 9; i++) {
	            var v = Math.floor(i / 3);
	            var w = i % 3;
	            ans.el[i] = this._inner_mulmatrix(v, value, w);
	        }
	        var tt = this.mulvector(new float3(value.t[0], value.t[1], value.t[2])).sub(new float3(this.t[0], this.t[1], this.t[2]));
	        ans.t[0] = this.t[0] + tt.x;
	        ans.t[1] = this.t[1] + tt.y;
	        ans.t[2] = this.t[2] + tt.z;
	        return ans;
	    }
	    mulvector(value) {
	        return new float3(this.el[0 + 0] * value.x + this.el[0 + 1] * value.y + this.el[0 + 2] * value.z + this.t[0], this.el[3 + 0] * value.x + this.el[3 + 1] * value.y + this.el[3 + 2] * value.z + this.t[1], this.el[6 + 0] * value.x + this.el[6 + 1] * value.y + this.el[6 + 2] * value.z + this.t[2]);
	    }
	    transposed() {
	        var ans = new tensor3t();
	        ans.el[0] = this.el[0];
	        ans.el[1] = this.el[3];
	        ans.el[2] = this.el[6];
	        ans.el[3] = this.el[1];
	        ans.el[4] = this.el[4];
	        ans.el[5] = this.el[7];
	        ans.el[6] = this.el[2];
	        ans.el[7] = this.el[5];
	        ans.el[8] = this.el[8];
	        return ans;
	    }
	    invert() {
	        var ans = new tensor3t();
	        var scale = 1 / this.determinant();
	        for (var i = 0; i < 9; i++) {
	            var v = Math.floor(i / 3);
	            var w = i % 3;
	            ans.el[i] = this.algebraic_cofactor(w, v) * scale;
	        }
	        var tt = ans.mulvector(new float3(this.t[0], this.t[1], this.t[2]));
	        ans.t[0] -= tt.x;
	        ans.t[1] -= tt.y;
	        ans.t[2] -= tt.z;
	        return ans;
	    }
	    algebraic_cofactor(row, column) {
	        var lst = new Array();
	        for (var i = 0; i < 3; i++) {
	            if (i == row)
	                continue;
	            for (var j = 0; j < 3; j++) {
	                if (j == column)
	                    continue;
	                lst.push(this.el[i * 3 + j]);
	            }
	        }
	        // 012 
	        // 345 
	        // 678 
	        return Math.pow(-1, row + column) *
	            (+lst[0] * lst[3]
	                - lst[1] * lst[2]);
	    }
	    determinant() {
	        //  0 1 2 
	        //  3 4 5
	        //  6 7 8
	        return + +this.el[0] * this.el[4] * this.el[8]
	            + this.el[1] * this.el[5] * this.el[6]
	            + this.el[2] * this.el[3] * this.el[7]
	            - this.el[0] * this.el[5] * this.el[7]
	            - this.el[1] * this.el[3] * this.el[8]
	            - this.el[2] * this.el[4] * this.el[6];
	    }
	    rotate(eular, axis) {
	        var sin = Math.sin(eular);
	        var cos = Math.cos(eular);
	        var v, v1, v2;
	        for (var i = 0; i < 3; i++) {
	            v = this.get_axis(i);
	            v1 = v.cancel(axis);
	            var n1 = v1.normal();
	            var n2 = axis.cross(n1).normal();
	            var len = v1.length;
	            v2 = n1.scale(cos * len).add(n2.scale(sin * len)).add(v.sub(v1));
	            this.set_axis(i, v2);
	        }
	    }
	    clone() {
	        var ans = new tensor3t();
	        for (var i = 0; i < 9; i++) {
	            ans.el[i] = this.el[i];
	        }
	        ans.t[0] = this.t[0];
	        ans.t[1] = this.t[1];
	        ans.t[2] = this.t[2];
	        return ans;
	    }
	}

	class GeometryStructureRayCastResult {
	    constructor() {
	    }
	}

	class ShapeOperationAdd {
	    static Add(a, b) {
	        var i, j, k;
	        var egshape;
	        var eg;
	        var egindex;
	        var pfhull;
	        var pfinternal;
	        var res = new Array();
	        if (Math.abs(a.normal.dot(b.normal)) < 1 - CalcConst.nearzero)
	            return res;
	        b.CalculateBoxBounds();
	        var es = new EdgeStructure();
	        ShapeOperationAdd.debug_es = es;
	        es.normal = a.normal.clone();
	        es.addshape(a, 0);
	        es.addshape(b, 1);
	        es.build_calc();
	        es.divide_overlaping();
	        var egs = es.find_duplicate();
	        {
	            var eg0, eg1;
	            for (i = 0; i < egs.length; i = j) {
	                eg0 = es.egs[egs[i]];
	                for (j = i + 1; j < egs.length; j++) {
	                    eg1 = es.egs[egs[j]];
	                    if (eg0.equals(eg1))
	                        continue;
	                    break;
	                }
	                eg1 = es.egs[egs[i + 1]];
	                for (k = i + 1; k < j; k++) {
	                    es.egs[egs[k]] = null; //ɾ���ص��ĸ���
	                }
	                if (eg0.v == eg1.v)
	                    continue; //ͬ�����������ڸ�������
	                es.egs[egs[i]] = null; //ɾ���ڷ����ڸ������ڵ�����
	            }
	            for (i = es.egs.length - 1; i > -1; i--) {
	                if (es.egs[i])
	                    continue;
	                es.egs.splice(i, 1);
	            }
	        }
	        es.divide_crossing();
	        {
	            for (i = 0; i < es.egs.length; i++) {
	                eg0 = es.egs[i];
	                if (eg0.tag == 1)
	                    continue;
	                if (!b.boxbound.ContainPoint(eg0.calc_o) || b.ContainPointANGLESUM(eg0.calc_o) != 1)
	                    continue;
	                es.egs.splice(i--, 1);
	            }
	        }
	        var egs_filters = [];
	        var egps_filters = [];
	        var good_hull;
	        var good_internal = false;
	        var hulls = [];
	        var internal = [];
	        pfhull = new ProcessFindEdgeLoopMax();
	        pfinternal = new ProcessFindEdgeLoopMax();
	        good_hull = false;
	        while (!good_hull) {
	            good_hull = true;
	            pfhull.run(es, egs_filters);
	            for (i = 0; i < pfhull.paths.length; i++) {
	                egshape = pfhull.paths[i];
	                var negate_egs_count = 0;
	                for (j = 0; j < egshape.egs.length; j++) {
	                    egindex = egshape.egs[j];
	                    eg = es.egs[egindex];
	                    if (eg.w != egshape.indices[j])
	                        continue;
	                    negate_egs_count++;
	                }
	                if (negate_egs_count == egshape.egs.length) {
	                    for (j = 0; j < egshape.egs.length; j++) {
	                        egindex = egshape.egs[j];
	                        egs_filters[egindex] = true;
	                    }
	                    var egs = pfhull.hierarchy_shape_egs[i];
	                    for (j = 0; j < egs.length; j++) {
	                        egs_filters[egs[j]] = true;
	                    }
	                }
	                else if (negate_egs_count > 0) {
	                    for (j = 0; j < egshape.egs.length; j++) {
	                        egindex = egshape.egs[j];
	                        eg = es.egs[egindex];
	                        if (eg.w != egshape.indices[j])
	                            continue;
	                        egs_filters[egindex] = true;
	                    }
	                    good_hull = false;
	                    continue;
	                }
	                else {
	                    hulls.push(i);
	                }
	            }
	        }
	        for (i = 0; i < hulls.length; i++) {
	            egshape = pfhull.paths[hulls[i]];
	            for (j = 0; j < egshape.egs.length; j++) {
	                egps_filters[egshape.egs[j]] = true;
	            }
	        }
	        if (hulls.length == 0)
	            return res;
	        pfinternal.run(es, egps_filters);
	        for (i = 0; i < pfinternal.paths.length; i++) {
	            egshape = pfinternal.paths[i];
	            good_internal = true;
	            for (j = 0; j < egshape.egs.length; j++) {
	                egindex = egshape.egs[j];
	                eg = es.egs[egindex];
	                if (eg.w == egshape.indices[j])
	                    continue;
	                good_internal = false;
	                break;
	            }
	            if (!good_internal)
	                continue;
	            internal.push(i);
	        }
	        for (i = 0; i < hulls.length; i++) {
	            var s0 = pfhull.vectorloops[hulls[i]];
	            res.push(s0);
	            for (j = 0; j < internal.length; j++) {
	                var s1 = pfinternal.vectorloops[internal[j]];
	                if (s0.ContainPointANGLESUM(s1.ves[0]) == 0)
	                    continue;
	                var s1ves = s1.ves.concat();
	                lstool.attach(s0.ves, s1ves.reverse());
	                s0.sections.push(s0.ves.length);
	                internal.splice(j--, 1);
	            }
	        }
	        return res;
	    }
	}

	class GeometryStructure {
	    constructor() {
	        this.ves = new Array();
	        this.surfaces = new Array();
	        this.lines = new Array();
	        this.positive_definite = true;
	        this.closure = true;
	        this.surfaceloops = [];
	    }
	    build_surfaceloops() {
	        this.surfaceloops = [];
	        var j;
	        for (j = 0; j < this.surfaces.length; j++) {
	            var vl = this._surface_to_loop(this.surfaces[j]);
	            vl.CalculateBoxBounds();
	            this.surfaceloops.push(vl);
	        }
	    }
	    addvertex(vertex) {
	        var j;
	        var found_same = false;
	        for (j = 0; j < this.ves.length; j++) {
	            if (this.ves[j].nearequals(vertex, CalcConst.dis_err)) {
	                found_same = true;
	                break;
	            }
	        }
	        if (found_same) {
	            return j;
	        }
	        else {
	            this.ves.push(vertex);
	            return this.ves.length - 1;
	        }
	    }
	    addsurface(vectorloop) {
	        var i;
	        var surface = new GeometrySurface();
	        for (i = 0; i < vectorloop.ves.length; i++) {
	            surface.indices.push(this.addvertex(vectorloop.ves[i].clone()));
	        }
	        surface.sections = vectorloop.sections.concat();
	        surface.normal = vectorloop.normal.clone();
	        surface.CalculateCenter(this.ves);
	        surface.CalculateRadius(this.ves);
	        this.surfaces.push(surface);
	        return surface;
	    }
	    CalculateEdgeList() {
	        var map = new Map();
	        var i, j, k;
	        var m, n;
	        var index;
	        var res = new Array();
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surf = this.surfaces[i];
	            for (j = 0; j < surf.sections.length - 1; j++) {
	                var section_start = surf.sections[j];
	                var section_size = surf.sections[j + 1] - surf.sections[j];
	                for (k = 0; k < section_size; k++) {
	                    n = surf.indices[section_start + k];
	                    m = surf.indices[section_start + (k + 1) % section_size];
	                    index = (n < m) ? n + "," + m : m + "," + n;
	                    if (map[index] == null) {
	                        res.push(n, m);
	                        map[index] = true;
	                    }
	                }
	            }
	        }
	        return res;
	    }
	    CalculateBallBound() {
	        this.center = new float3();
	        this.radius = 0;
	        {
	            var i;
	            var invlength = 1 / this.ves.length;
	            for (i = 0; i < this.ves.length; i++) {
	                this.center = this.center.advance(this.ves[i], invlength);
	            }
	            for (i = 0; i < this.ves.length; i++) {
	                var dissq = this.ves[i].sub(this.center).lengthSq;
	                if (dissq > this.radius) {
	                    this.radius = dissq;
	                }
	            }
	            this.radius = Math.sqrt(this.radius);
	            for (i = 0; i < this.surfaces.length; i++) {
	                this.surfaces[i].CalculateCenter(this.ves);
	                this.surfaces[i].CalculateRadius(this.ves);
	            }
	        }
	    }
	    DirColor(dir, color, dot_err = 0.001) {
	        for (var i = 0; i < this.surfaces.length - 1; i++) {
	            if (this.surfaces[i].normal.dot(dir) > 1 - dot_err) {
	                this.surfaces[i].color = color;
	            }
	        }
	    }
	    filterSurfaceWithIndices(indices) {
	        for (var i = 0; i < this.surfaces.length; i++) {
	            var surf = this.surfaces[i];
	            var check = false;
	            for (var j = 0; j < indices.length; j++) {
	                var index = indices[j];
	                check = false;
	                for (var k = 0; k < surf.indices.length; k++) {
	                    var index1 = surf.indices[k];
	                    check = index == index1;
	                    if (check)
	                        break;
	                }
	                if (check)
	                    continue;
	                else
	                    break;
	            }
	            if (!check)
	                continue;
	            this.surfaces[0] = surf;
	            this.surfaces.length = 1;
	            break;
	        }
	    }
	    raycast(ray, distance_error = 0.001, positiveNormal = true, mask = null) {
	        var best_distance = Number.MAX_VALUE;
	        var best_index = Number.MAX_VALUE;
	        var best_hit;
	        var best_hittype;
	        var distance;
	        if (VectorCalc.dotLineDistance(ray.pos, ray.pos.add(ray.dir), this.center) > this.radius) {
	            return null;
	        }
	        for (var i = 0; i < this.surfaces.length; i++) {
	            if (mask != null && mask.length > i && mask[i] == true)
	                continue;
	            var surface = this.surfaces[i];
	            var a = surface.center;
	            var n = surface.normal;
	            if (positiveNormal && n.dot(ray.dir) >= 0)
	                continue; // 朝向过滤
	            var cp = VectorCalc.rayCrossPlane(ray, a, n.negate(), CalcConst.dot_err, false);
	            if (cp == null)
	                continue;
	            distance = ray.pos.sub(cp).length;
	            if (distance < best_distance) {
	                var hittype = surface.containPoint(this.ves, cp, CalcConst.dis_err);
	                if (hittype == 0)
	                    continue;
	                best_distance = distance;
	                best_index = i;
	                best_hit = cp;
	                best_hittype = hittype;
	            }
	        }
	        if (best_index == Number.MAX_VALUE)
	            return null;
	        var gsrcr = new GeometryStructureRayCastResult();
	        gsrcr.hit = best_hit;
	        gsrcr.distance = best_distance;
	        gsrcr.surfaceIndex = best_index;
	        gsrcr.surface = this.surfaces[best_index];
	        gsrcr.hittype = best_hittype;
	        return gsrcr;
	    }
	    getDirectionalLimit(dir, out_a, out_b) {
	        if (this.ves.length == 0)
	            return;
	        var minPos = this.ves[0];
	        var maxPos = this.ves[0];
	        for (var i = 0; i < this.ves.length; i++) {
	            var p = this.ves[i];
	            if (minPos.dot(dir) > p.dot(dir)) {
	                minPos = p;
	            }
	            if (maxPos.dot(dir) < p.dot(dir)) {
	                maxPos = p;
	            }
	        }
	        out_a.fill(minPos);
	        out_b.fill(maxPos);
	    }
	    toString(precision = 4) {
	        var i = 0;
	        var out = "";
	        var endl = "\n";
	        out += "GeometryStructure(" + endl;
	        out += "vertices:";
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            out += v.x.toFixed(precision) + "," + v.y.toFixed(precision) + "," + v.z.toFixed(precision) + ",";
	        }
	        out += endl;
	        out += "surfaces:[" + endl;
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surf = this.surfaces[i];
	            out += surf.toString(precision);
	        }
	        out += "]" + endl;
	        out += ")" + endl;
	        return out;
	    }
	    fromString(value) {
	        var sh = new StringHelper(value);
	        var endl = "\n";
	        if (sh.ReadAB("GeometryStructure(", endl) == null)
	            return;
	        var r_verts = new StringHelper(sh.ReadABContent("vertices:", endl));
	        while (true) {
	            var r_vert = r_verts.ReadAB("float3(", ")");
	            if (StringHelper.isNull(r_vert))
	                break;
	            this.ves.push(float3.fromString(r_vert));
	        }
	        var r_surfs = new StringHelper(sh.ReadABContent("surfaces:[", "]surfaces"));
	        while (true) {
	            var r_surf = r_surfs.ReadAB("GeometrySurface(", ")GeometrySurface");
	            if (StringHelper.isNull(r_surf))
	                break;
	            var surf = new GeometrySurface();
	            surf.fromString(r_surf);
	            this.surfaces.push(surf);
	        }
	    }
	    splitWithNormal(normal, epsilon = 0.0001) {
	        var out = this.clone();
	        for (var i = 0; i < this.surfaces.length; i++) {
	            if (this.surfaces[i].normal.dot(normal) > 1 - CalcConst.nearzero) {
	                this.surfaces.splice(i--, 1);
	            }
	        }
	        for (i = 0; i < out.surfaces.length; i++) {
	            if (out.surfaces[i].normal.dot(normal) < 1 - CalcConst.nearzero) {
	                out.surfaces.splice(i--, 1);
	            }
	        }
	        return out;
	    }
	    getBoxBound() {
	        if (this.ves.length < 1) {
	            return new BoxBound();
	        }
	        var min = this.ves[0].clone();
	        var max = this.ves[0].clone();
	        for (var i = 0; i < this.ves.length; i++) {
	            min.x = Math.min(this.ves[i].x, min.x);
	            min.y = Math.min(this.ves[i].y, min.y);
	            min.z = Math.min(this.ves[i].z, min.z);
	            max.x = Math.max(this.ves[i].x, max.x);
	            max.y = Math.max(this.ves[i].y, max.y);
	            max.z = Math.max(this.ves[i].z, max.z);
	        }
	        var bounds = BoxBound.CreateWithMinMax(min, max);
	        return bounds;
	    }
	    clear() {
	        this.ves.length = 0;
	        this.surfaces.length = 0;
	    }
	    containPoint(point, jump_radian = 0.017444) {
	        var i;
	        if (this.ves.length < 3)
	            return 0;
	        var point;
	        var hit_type;
	        var ray = new Ray(point, float3.lerp(this.ves[0], this.ves[1], 0.5).sub(point).normal());
	        var rot = new tensor3();
	        rot.rotateX(jump_radian);
	        rot.rotateY(jump_radian);
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surface = this.surfaces[i];
	            surface.CalculateCenter(this.ves);
	            surface.CalculateRadius(this.ves);
	            hit_type = surface.containPoint(this.ves, point, CalcConst.dis_err);
	            switch (result) {
	                case 1:
	                    return (1 << 1) + 1;
	                case 3:
	                    return (1 << 2) + 1;
	                case 7:
	                    return (1 << 3) + 1;
	            }
	        }
	        var retry = true;
	        var retry_count = 0;
	        var result = 0;
	        while (true) {
	            retry = false;
	            ray.dir = rot.mulvector(ray.dir);
	            var hit_count = new float2();
	            for (i = 0; i < this.surfaces.length; i++) {
	                surface = this.surfaces[i];
	                var hit = VectorCalc.rayCrossPlane(ray, surface.center, surface.normal, CalcConst.dis_err, true);
	                if (hit != null && hit.sub(surface.center).length < surface.radius + CalcConst.dis_err) {
	                    hit_type = surface.containPoint(this.ves, hit, CalcConst.dis_err);
	                    var hit_len = hit.sub(ray.pos).dot(ray.dir);
	                    if (hit_type > 1) {
	                        retry = true;
	                        break;
	                    }
	                    if (hit_type == 1) {
	                        if (Math.abs(hit_len) < CalcConst.dis_err)
	                            return 3;
	                        if (hit_len > 0) {
	                            hit_count.x++;
	                        }
	                        else if (hit_len < 0) {
	                            hit_count.y++;
	                        }
	                    }
	                }
	            }
	            if (retry) {
	                if (retry_count > 5)
	                    return Number.MAX_VALUE;
	                retry_count++;
	                continue;
	            }
	            if (hit_count.x % 2 == 1 && hit_count.y % 2 == 1)
	                result = 1;
	            else
	                result = 0;
	            break;
	        }
	        if (!this.positive_definite)
	            switch (result) {
	                case 0: return 1;
	                case 1: return 0;
	            }
	        return result;
	    }
	    copy(src) {
	        var i;
	        for (i = 0; i < src.ves.length; i++) {
	            this.ves.push(src.ves[i].clone());
	        }
	        for (i = 0; i < src.surfaces.length; i++) {
	            this.surfaces.push(src.surfaces[i].clone());
	        }
	    }
	    clone() {
	        var g = new GeometryStructure();
	        for (var i = 0; i < this.ves.length; i++) {
	            g.ves.push(this.ves[i].clone());
	        }
	        for (i = 0; i < this.surfaces.length; i++) {
	            g.surfaces.push(this.surfaces[i].clone());
	        }
	        return g;
	    }
	    applyMatrix(matrix) {
	        var i = 0;
	        var zero = matrix.mulvector(new float3());
	        var mR = matrix.clone();
	        mR.translate(zero.negate());
	        for (i = 0; i < this.ves.length; i++) {
	            var p = matrix.mulvector(this.ves[i]);
	            this.ves[i].fill(p);
	        }
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surface = this.surfaces[i];
	            surface.normal = mR.mulvector(surface.normal).normalf();
	        }
	    }
	    applyRotation(eular) {
	        this.applyMatrix(tensor3t.eular(eular));
	    }
	    applyScale(scale) {
	        var m = new tensor3t();
	        m.scale(scale);
	        this.applyMatrix(m);
	    }
	    applyTranslation(value) {
	        for (var i = 0; i < this.ves.length; i++) {
	            this.ves[i].addby(value);
	        }
	    }
	    InvertSurfaces() {
	        var i = 0;
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surface = this.surfaces[i];
	            surface.normal = surface.normal.negate();
	            surface.indices.reverse();
	        }
	    }
	    InvertDefine() {
	        var i = 0;
	        for (i = 0; i < this.surfaces.length; i++) {
	            var surface = this.surfaces[i];
	            surface.normal = surface.normal.negate();
	            surface.indices.reverse();
	        }
	        this.positive_definite = !this.positive_definite;
	    }
	    Simplify() {
	        var new_vertices = new Array();
	        var i, j;
	        var map = new Array();
	        for (i = 0; i < this.ves.length; i++) {
	            map[i] = Number.MAX_VALUE;
	        }
	        var ip;
	        var new_ip;
	        for (i = 0; i < this.ves.length; i++) {
	            var v = this.ves[i];
	            if (map[i] != Number.MAX_VALUE)
	                continue;
	            new_ip = new_vertices.length;
	            new_vertices.push(v);
	            map[i] = new_ip;
	            for (j = i + 1; j < this.ves.length; j++) {
	                if (v.nearequals(this.ves[j], CalcConst.dis_err)) {
	                    map[j] = new_ip;
	                }
	            }
	        }
	        this.ves = new_vertices;
	        var surface;
	        for (i = 0; i < this.surfaces.length; i++) {
	            surface = this.surfaces[i];
	            for (j = 0; j < surface.indices.length; j++) {
	                ip = surface.indices[j];
	                surface.indices[j] = map[ip];
	            }
	        }
	        new_vertices = new Array();
	        map = new Array();
	        map.length = this.ves.length;
	        for (i = 0; i < this.ves.length; i++) {
	            map[i] = Number.MAX_VALUE;
	        }
	        for (i = 0; i < this.surfaces.length; i++) {
	            surface = this.surfaces[i];
	            for (j = 0; j < surface.indices.length; j++) {
	                ip = surface.indices[j];
	                new_ip = map[ip];
	                if (new_ip == Number.MAX_VALUE) {
	                    new_ip = new_vertices.length;
	                    new_vertices.push(this.ves[ip]);
	                    map[ip] = new_ip;
	                }
	                surface.indices[j] = new_ip;
	            }
	        }
	        this.ves = new_vertices;
	    }
	    _surface_to_loop(surface) {
	        var loop = new Shape();
	        for (var i = 0; i < surface.indices.length; i++) {
	            loop.ves.push(this.ves[surface.indices[i]]);
	        }
	        loop.normal = surface.normal;
	        loop.sections = surface.sections;
	        return loop;
	    }
	    static fromString(value) {
	        var result = new GeometryStructure();
	        result.fromString(value);
	        return result;
	    }
	    createBox(size) {
	        var geometry = this;
	        var points = new Array();
	        var hsize = size.scale(0.5);
	        geometry.closure = true;
	        points.push(new float3(-hsize.x, -hsize.y, -hsize.z));
	        points.push(new float3(+hsize.x, -hsize.y, -hsize.z));
	        points.push(new float3(+hsize.x, +hsize.y, -hsize.z));
	        points.push(new float3(-hsize.x, +hsize.y, -hsize.z));
	        points.push(new float3(-hsize.x, -hsize.y, +hsize.z));
	        points.push(new float3(+hsize.x, -hsize.y, +hsize.z));
	        points.push(new float3(+hsize.x, +hsize.y, +hsize.z));
	        points.push(new float3(-hsize.x, +hsize.y, +hsize.z));
	        for (var i = 0; i < points.length; i++) {
	            geometry.ves.push(points[i]);
	        }
	        var surface;
	        {
	            surface = new GeometrySurface();
	            surface.indices.push(3, 2, 1, 0);
	            surface.normal = new float3(0, 0, -1);
	            surface.sections.push(0, surface.indices.length);
	            geometry.surfaces.push(surface);
	            surface = new GeometrySurface();
	            surface.indices.push(0 + 4, 1 + 4, 2 + 4, 3 + 4);
	            surface.normal = new float3(0, 0, +1);
	            surface.sections.push(0, surface.indices.length);
	            geometry.surfaces.push(surface);
	            for (i = 0; i < 4; i++) {
	                surface = new GeometrySurface();
	                surface.indices.push(i + 0, (i + 1) % 4, ((i + 1) % 4) + 4, i + 0 + 4);
	                var a = geometry.ves[surface.indices[0]];
	                var b = geometry.ves[surface.indices[1]];
	                var c = geometry.ves[surface.indices[2]];
	                surface.normal = b.sub(a).cross(c.sub(b)).normal();
	                surface.sections.push(0, surface.indices.length);
	                geometry.surfaces.push(surface);
	            }
	        }
	        return geometry;
	    }
	    createPlane(size, axis = null) {
	        var geometry = this;
	        geometry.closure = false;
	        var points = new Array();
	        var hw = size.x / 2;
	        var hh = size.y / 2;
	        var normal = new float3(1, 1, 1);
	        if (axis == null)
	            axis = new float3(0, 0, 1);
	        axis = axis.normal();
	        var ax0;
	        var ax1;
	        ax0 = new float3(axis.z, axis.x, axis.y);
	        ax1 = new float3(ax0.z, ax0.x, ax0.y);
	        points.push(ax0.scale(-hw).add(ax1.scale(-hh)));
	        points.push(ax0.scale(+hw).add(ax1.scale(-hh)));
	        points.push(ax0.scale(+hw).add(ax1.scale(+hh)));
	        points.push(ax0.scale(-hw).add(ax1.scale(+hh)));
	        for (var i = 0; i < points.length; i++) {
	            geometry.ves.push(points[i]);
	        }
	        var surface = new GeometrySurface();
	        surface.indices.push(0, 1, 2, 3);
	        surface.normal = axis;
	        surface.sections.push(0, surface.indices.length);
	        var loop = geometry._surface_to_loop(surface);
	        if (loop.MakePositive(normal)) {
	            surface.indices.reverse();
	        }
	        geometry.surfaces.push(surface);
	        return geometry;
	    }
	    static Merge(gs0, gs1) {
	        var result = new GeometryStructure();
	        result.closure = (gs0.closure && gs1.closure);
	        var i, j;
	        var surface;
	        var map;
	        result.ves = gs0.ves.concat();
	        result.surfaces = gs0.surfaces.concat();
	        map = new Array();
	        map.length = gs1.ves.length;
	        for (i = 0; i < gs1.ves.length; i++) {
	            var found = false;
	            for (j = 0; j < result.ves.length; j++) {
	                if (gs1.ves[i].nearequals(result.ves[j], CalcConst.dis_err)) {
	                    found = true;
	                    break;
	                }
	            }
	            if (found) {
	                map[i] = j;
	            }
	            else {
	                map[i] = result.ves.length;
	                result.ves.push(gs1.ves[i]);
	            }
	        }
	        for (var i = 0; i < gs1.surfaces.length; i++) {
	            surface = gs1.surfaces[i];
	            var new_surface = new GeometrySurface();
	            new_surface.normal = surface.normal;
	            for (var j = 0; j < surface.indices.length; j++) {
	                new_surface.indices.push(map[surface.indices[j]]);
	            }
	            new_surface.sections = surface.sections.concat();
	            result.surfaces.push(new_surface);
	        }
	        result.Simplify();
	        { // 合并面
	            for (i = 0; i < result.surfaces.length; i++) {
	                var s0 = result.surfaces[i];
	                if (s0.sections.length > 2)
	                    continue; // TODO:  Should Do This All the time.
	                var l0 = result._surface_to_loop(s0);
	                for (j = i + 1; j < result.surfaces.length; j++) {
	                    var s1 = result.surfaces[j];
	                    if (s1.sections.length > 2)
	                        continue; // TODO:  Should Do This All the time.
	                    var l1 = result._surface_to_loop(s1);
	                    var on_same_plane = s0.normal.nearequals(s1.normal, CalcConst.dis_err) && Math.abs(l1.ves[0].sub(l0.ves[0]).dot(s0.normal)) < CalcConst.dis_err;
	                    if (!on_same_plane)
	                        continue;
	                    if (GeometryStructure.merge_surface(result, s0, s1)) {
	                        result.surfaces.splice(j, 1);
	                        j--;
	                    }
	                }
	            }
	        }
	        result.Simplify();
	        return result;
	    }
	    static merge_surface(gs, s0, s1) {
	        var index0;
	        var vert;
	        var i, j;
	        var index1_a;
	        var index1_b;
	        var line_contain_vert;
	        var need = false;
	        for (i = 0; i < s0.indices.length; i++) {
	            index0 = s0.indices[i];
	            vert = gs.ves[index0];
	            for (j = 0; j < s1.indices.length; j++) {
	                index1_a = s1.indices[j + 0];
	                index1_b = s1.indices[(j + 1) % s1.indices.length];
	                line_contain_vert = VectorCalc.segmentContainPoint(gs.ves[index1_a], gs.ves[index1_b], vert, CalcConst.dis_err);
	                if (line_contain_vert != 1)
	                    continue;
	                s1.indices.splice(j + 1, 0, index0);
	                need = true;
	                break;
	            }
	        }
	        for (i = 0; i < s1.indices.length; i++) {
	            index0 = s1.indices[i];
	            vert = gs.ves[index0];
	            for (j = 0; j < s0.indices.length; j++) {
	                index1_a = s0.indices[j + 0];
	                index1_b = s0.indices[(j + 1) % s0.indices.length];
	                line_contain_vert = VectorCalc.segmentContainPoint(gs.ves[index1_a], gs.ves[index1_b], vert, CalcConst.dis_err);
	                if (line_contain_vert != 1)
	                    continue;
	                s0.indices.splice(j + 1, 0, index0);
	                need = true;
	                break;
	            }
	        }
	        if (!need)
	            return false;
	        s0.Combine(s1);
	        return true;
	    }
	    static surfaceAdd(a, b) {
	        var res = new GeometryStructure();
	        var vls0 = new Array();
	        var vls1 = new Array();
	        var i, j, k;
	        var s0, s1;
	        var l0, l1;
	        var surf;
	        var vls1_touched = new Array();
	        lstool.init(vls1_touched, false, b.surfaces.length);
	        for (i = 0; i < a.surfaces.length; i++) {
	            s0 = a.surfaces[i];
	            l0 = a._surface_to_loop(s0);
	            l0.CalculateBoxBounds();
	            vls0.push(l0);
	        }
	        for (i = 0; i < b.surfaces.length; i++) {
	            s1 = b.surfaces[i];
	            l1 = b._surface_to_loop(s1);
	            l1.CalculateBoxBounds();
	            vls1.push(l1);
	        }
	        for (i = 0; i < vls0.length; i++) {
	            l0 = vls0[i];
	            s0 = a.surfaces[i];
	            var touched = false;
	            for (j = 0; j < vls1.length; j++) {
	                l1 = vls1[j];
	                s1 = b.surfaces[j];
	                var on_same_plane = Math.abs(l0.normal.dot(l1.normal)) > 1 - CalcConst.nearzero && Math.abs(l1.ves[0].sub(l0.ves[0]).dot(s0.normal)) < CalcConst.dis_err;
	                if (!on_same_plane)
	                    continue;
	                if (!l0.boxbound.intersectBounds(l1.boxbound))
	                    continue;
	                var good = false;
	                for (k = 0; k < l1.ves.length; k++) {
	                    if (l0.ContainPointANGLESUM(l1.ves[k]) == 0)
	                        continue;
	                    good = true;
	                    break;
	                }
	                if (!good)
	                    continue;
	                var merge = ShapeOperationAdd.Add(l0, l1);
	                for (k = 0; k < merge.length; k++) {
	                    surf = res.addsurface(merge[k]);
	                    surf.optag = '+';
	                }
	                if (merge.length > 0)
	                    vls1_touched[j] = true;
	                touched = true;
	            }
	            if (touched)
	                continue;
	            surf = res.addsurface(l0);
	            surf.optag = s0.optag;
	        }
	        for (i = 0; i < vls1_touched.length; i++) {
	            if (vls1_touched[i])
	                continue;
	            surf = res.addsurface(vls1[i]);
	            surf.optag = b.surfaces[i].optag;
	        }
	        return res;
	    }
	}

	let ProcessSurfaceTriangleFill = /** @class */ (() => {
	    class ProcessSurfaceTriangleFill {
	        constructor() {
	            this.ves_usecount = new Array();
	            this.borders = new Array();
	            this.triangles = new Array();
	            this.enablestepinto = false;
	        }
	        static FillTriangle(ves, indices, sections, normal, stepbystep = false) {
	            var me = new ProcessSurfaceTriangleFill();
	            me.ves = ves;
	            me.indices = indices;
	            me.sections = sections != null ? sections : [0, indices.length];
	            me.normal = normal;
	            me.enablestepinto = stepbystep;
	            me.init();
	            if (!stepbystep)
	                me.run();
	            return me;
	        }
	        init() {
	            this.ves_usecount.length = 0;
	            this.ves_usecount.length = this.ves.length;
	            this.borders.length = 0;
	            this.triangles.length = 0;
	            var i, j;
	            for (i = 0; i < this.indices.length; i++) {
	                this.ves_usecount[this.indices[i]]++;
	            }
	            var b0, b1;
	            var bidx;
	            for (i = 0; i < this.sections.length - 1; i++) {
	                bidx = this.borders.length;
	                for (j = this.sections[i]; j < this.sections[i + 1] - 1; j++) {
	                    b0 = new ProcessSurfaceTriangleFill_Edge(this.indices[j + 0], this.indices[j + 1]);
	                    b0.legd = this.borders.length - 1;
	                    b0.regd = this.borders.length + 1;
	                    this.borders.push(b0);
	                }
	                b0 = new ProcessSurfaceTriangleFill_Edge(this.indices[this.sections[i + 1] - 1], this.indices[this.sections[i + 0]]);
	                b0.legd = this.borders.length - 1;
	                b0.regd = bidx;
	                this.borders.push(b0);
	                b0 = this.borders[bidx];
	                b0.legd = this.borders.length - 1;
	            }
	            var use_loop_splite = false;
	            lstool.init(this.ves_usecount, 0, this.ves.length);
	            for (i = 0; i < this.borders.length; i++) {
	                b0 = this.borders[i];
	                this.ves_usecount[b0.v]++;
	                this.ves_usecount[b0.w]++;
	                if (this.ves_usecount[b0.v] > 2 || this.ves_usecount[b0.w] > 2)
	                    use_loop_splite = true;
	            }
	            if (use_loop_splite) {
	                var v0, v1, v2;
	                for (i = 0; i < this.borders.length; i++) { // 针对两闭环共点问题 寻找最小闭环的连接方式
	                    b0 = this.borders[i];
	                    if (this.ves_usecount[b0.w] <= 2)
	                        continue;
	                    var bst_angle = -Math.PI;
	                    var bst_reg;
	                    var angle;
	                    for (j = 0; j < this.borders.length; j++) {
	                        if (i == j)
	                            continue;
	                        b1 = this.borders[j];
	                        if (b0.w != b1.v)
	                            continue;
	                        v0 = this.ves[b0.v];
	                        v1 = this.ves[b0.w];
	                        v2 = this.ves[b1.w];
	                        angle = VectorCalc.angle(v1.sub(v0).normal(), v2.sub(v1).normal(), this.normal);
	                        if (angle < bst_angle)
	                            continue;
	                        bst_angle = angle;
	                        bst_reg = j;
	                    }
	                    b0.regd = bst_reg;
	                }
	            }
	        }
	        find_edge_refs(edgeid) {
	            var i;
	            var res = new Array();
	            for (i = 0; i < this.borders.length; i++) {
	                var b = this.borders[i];
	                if (b.legd == edgeid || b.regd == edgeid) {
	                    res.push(i);
	                }
	            }
	            return res;
	        }
	        find_edge(idx0, idx1) {
	            var i;
	            for (i = 0; i < this.borders.length; i++) {
	                var b = this.borders[i];
	                if (b.v == idx0 && b.w == idx1) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	        run() {
	            var improve_total = 0;
	            var improve;
	            if (!this.enablestepinto) {
	                improve = 0;
	                improve += this.pass0();
	                improve += this.pass1(); // first run
	                while (improve > 0) {
	                    improve = 0;
	                    improve += this.pass0();
	                    improve += this.pass1();
	                    improve_total += improve;
	                }
	            }
	            var res = this.check_finish();
	            res["improve"] = improve_total;
	            return res;
	        }
	        check_finish() {
	            var border_left = this.borders.length;
	            var ves_left = this.ves.length;
	            var i;
	            for (i = 0; i < this.borders.length; i++) {
	                var b = this.borders[i];
	                if (b.legd - b.regd == 0) {
	                    border_left--;
	                }
	                else if (b.v - b.w == 0) {
	                    border_left--;
	                }
	            }
	            for (i = 0; i < this.ves.length; i++) {
	                if (this.ves_usecount[i] == 0)
	                    ves_left--;
	            }
	            var res = new Object();
	            res["border"] = border_left + " / " + this.borders.length;
	            res["ves"] = ves_left + " / " + this.ves.length;
	            return res;
	        }
	        isedge15(edge) {
	            if (edge.v == 4 && edge.w == 6) {
	                return true;
	            }
	            return false;
	        }
	        check_edges() {
	            var i;
	            var res = new Array();
	            for (i = 0; i < this.borders.length; i++) {
	                var refs = this.find_edge_refs(i);
	                if (refs.length != 2 && refs.length != 0) {
	                    res.push({ 'id': i, 'refs': refs.toString() });
	                }
	            }
	            return res;
	        }
	        check_error() {
	            var i;
	            var b0, b1, b2;
	            for (i = 0; i < this.borders.length; i++) {
	                b0 = this.borders[i];
	                if (b0.v == -1 && b0.w != -1 || b0.v != -1 && b0.w == -1)
	                    return true;
	                if (b0.legd != -1 && b0.regd != -1) {
	                    b1 = this.borders[b0.legd];
	                    if (b1.legd == b1.regd) {
	                        return true;
	                    }
	                    b2 = this.borders[b0.regd];
	                    if (b2.legd == b2.regd) {
	                        return true;
	                    }
	                }
	            }
	            return false;
	        }
	        pass0() {
	            var i, j, m;
	            var b0, b1, b2;
	            var c1, c2;
	            var c1i, c2i;
	            var v, v0, v1, v2;
	            var idx0, idx1, idx2;
	            var improve = 0;
	            for (i = 0; i < this.borders.length; i++) {
	                b0 = this.borders[i];
	                if (!b0.open)
	                    continue;
	                b1 = this.borders[b0.regd];
	                idx0 = b0.v;
	                idx1 = b0.w;
	                idx2 = b1.w;
	                v0 = this.ves[idx0];
	                v1 = this.ves[idx1];
	                v2 = this.ves[idx2];
	                if (v1.sub(v0).cross(v2.sub(v1)).normal().dot(this.normal) < CalcConst.nearzero)
	                    continue;
	                if (VectorCalc.angle(v1.sub(v0).normal(), v2.sub(v1).normal(), this.normal) < CalcConst.dot_err)
	                    continue;
	                var OUT = new Ray(v0, this.normal.cross(v2.sub(v0)).normal());
	                var lIN = this.normal.cross(v1.sub(v0)).normal();
	                var rIN = this.normal.cross(v2.sub(v1)).normal();
	                if (OUT.dir.dot(v0.sub(v1)) < 0) {
	                    OUT.dir.scaleBy(-1);
	                }
	                var vcount = 0;
	                var bst_m = -1;
	                var good_border = true;
	                for (m = 0; m < this.ves.length; m++) {
	                    v = this.ves[m].sub(v1);
	                    if (this.ves_usecount[m] == 0)
	                        continue;
	                    if (v.dot(lIN) <= CalcConst.nearzero || v.dot(rIN) <= CalcConst.nearzero)
	                        continue;
	                    var dis = this.ves[m].sub(OUT.pos).dot(OUT.dir);
	                    if (dis > +CalcConst.dis_err)
	                        continue;
	                    if (Math.abs(dis) < CalcConst.nearzero) {
	                        good_border = false;
	                        continue;
	                    }
	                    bst_m = m;
	                    vcount++;
	                }
	                if (vcount == 0 && good_border) {
	                    var bcout;
	                    c2i = this.find_edge(idx2, idx0);
	                    if (c2i >= 0) {
	                        b2 = this.borders[c2i];
	                        this.ves_usecount[b2.v]--;
	                        this.ves_usecount[b2.w]--;
	                        b2.open = false;
	                        b2.legd = -1;
	                        b2.regd = -1;
	                    }
	                    else {
	                        if (b0.legd != b1.regd) {
	                            b2 = new ProcessSurfaceTriangleFill_Edge(idx0, idx2);
	                            this.ves_usecount[b2.v]++;
	                            this.ves_usecount[b2.w]++;
	                            b2.legd = b0.legd;
	                            b2.regd = b1.regd;
	                            bcout = this.borders.length;
	                            this.borders.push(b2);
	                            this.borders[b2.legd].regd = bcout;
	                            this.borders[b2.regd].legd = bcout;
	                        }
	                        else {
	                            this.borders[b0.legd].regd = -1;
	                            this.borders[b1.regd].legd = -1;
	                        }
	                    }
	                    this.triangles.push(idx0, idx1, idx2);
	                    b0.legd = -1;
	                    b0.regd = -1;
	                    b1.legd = -1;
	                    b1.regd = -1;
	                    b0.open = false;
	                    b1.open = false;
	                    this.ves_usecount[b0.v]--;
	                    this.ves_usecount[b0.w]--;
	                    this.ves_usecount[b1.v]--;
	                    this.ves_usecount[b1.w]--;
	                    improve++;
	                    if (this.enablestepinto)
	                        break;
	                }
	                else if (vcount == 1 && this.ves_usecount[bst_m] == 2) {
	                    c1i = this.find_edge(bst_m, idx0);
	                    c2i = this.find_edge(idx2, bst_m);
	                    var bst_m_leg;
	                    var bst_m_reg;
	                    for (j = 0; j < this.borders.length; j++) {
	                        if (this.borders[j].w == bst_m)
	                            bst_m_leg = j;
	                        else if (this.borders[j].v == bst_m)
	                            bst_m_reg = j;
	                    }
	                    if (c1i >= 0) {
	                        c1 = this.borders[c1i];
	                        this.ves_usecount[c1.v]--;
	                        this.ves_usecount[c1.w]--;
	                        c1.open = false;
	                        c1.legd = -1;
	                        c1.regd = -1;
	                    }
	                    else {
	                        c1 = new ProcessSurfaceTriangleFill_Edge(idx0, bst_m);
	                        this.ves_usecount[c1.v]++;
	                        this.ves_usecount[c1.w]++;
	                        c1.legd = b0.legd;
	                        c1.regd = bst_m_reg;
	                        bcout = this.borders.length;
	                        this.borders.push(c1);
	                        this.borders[c1.legd].regd = bcout;
	                        this.borders[c1.regd].legd = bcout;
	                    }
	                    if (c2i >= 0) {
	                        c2 = this.borders[c2i];
	                        this.ves_usecount[c2.v]--;
	                        this.ves_usecount[c2.w]--;
	                        c2.open = false;
	                        c2.legd = -1;
	                        c2.regd = -1;
	                    }
	                    else {
	                        c2 = new ProcessSurfaceTriangleFill_Edge(bst_m, idx2);
	                        this.ves_usecount[c2.v]++;
	                        this.ves_usecount[c2.w]++;
	                        c2.legd = bst_m_leg;
	                        c2.regd = b1.regd;
	                        bcout = this.borders.length;
	                        this.borders.push(c2);
	                        this.borders[c2.legd].regd = bcout;
	                        this.borders[c2.regd].legd = bcout;
	                    }
	                    this.triangles.push(idx0, idx1, bst_m);
	                    this.triangles.push(idx1, idx2, bst_m);
	                    b0.legd = -1;
	                    b0.regd = -1;
	                    b1.legd = -1;
	                    b1.regd = -1;
	                    b0.open = false;
	                    b1.open = false;
	                    this.ves_usecount[b0.v]--;
	                    this.ves_usecount[b0.w]--;
	                    this.ves_usecount[b1.v]--;
	                    this.ves_usecount[b1.w]--;
	                }
	                continue;
	            }
	            return improve;
	        }
	        pass1() {
	            var i, j, m;
	            var b, b0, b1, b2;
	            var b1_, b2_;
	            var v, v0, v1, v2, vi;
	            var improve = 0;
	            for (i = 0; i < this.borders.length; i++) {
	                b0 = this.borders[i];
	                if (!b0.open)
	                    continue;
	                b1 = this.borders[b0.legd];
	                b2 = this.borders[b0.regd];
	                vi = this.ves[b1.v];
	                v0 = this.ves[b0.v];
	                v1 = this.ves[b0.w];
	                v2 = this.ves[b2.w];
	                var IN = this.normal.cross(v1.sub(v0)).normal();
	                if (v2.sub(v0).dot(IN) < +CalcConst.nearzero || vi.sub(v0).dot(IN) < +CalcConst.nearzero)
	                    continue;
	                var IN2 = this.normal.cross(v2.sub(vi)).normal();
	                var lIN = this.normal.cross(v0.sub(vi)).normal();
	                var rIN = this.normal.cross(v2.sub(v1)).normal();
	                var dis_bst = Number.MAX_VALUE;
	                var vidx_bst = -1;
	                var inside_mode = false;
	                for (m = 0; m < this.ves.length; m++) {
	                    if (this.ves_usecount[m] == 0)
	                        continue;
	                    v = this.ves[m];
	                    if ((m - b0.v) * (m - b0.w) == 0)
	                        continue;
	                    var dis = v.sub(v0).dot(IN);
	                    var dis_IN2 = v.sub(v2).dot(IN2);
	                    var side_in = lIN.dot(v.sub(vi)) > +CalcConst.nearzero && rIN.dot(v.sub(v2)) > +CalcConst.nearzero;
	                    var inside = dis_IN2 < -CalcConst.nearzero && side_in && dis > 0;
	                    inside_mode = inside || inside_mode;
	                    if (inside_mode) {
	                        if (dis_bst < 0)
	                            dis_bst = Number.MAX_VALUE;
	                        if (inside && dis < dis_bst) {
	                            dis_bst = dis;
	                            vidx_bst = m;
	                        }
	                    }
	                    else if (dis < dis_bst) {
	                        dis_bst = dis;
	                        vidx_bst = -1;
	                        if (dis > 0 && side_in) {
	                            vidx_bst = m;
	                        }
	                    }
	                }
	                if (vidx_bst == -1)
	                    continue;
	                v = this.ves[vidx_bst];
	                var bidx_leg;
	                var bidx_reg;
	                var bst_bidx_leg_angle = -Math.PI;
	                var bst_bidx_reg_angle = -Math.PI;
	                for (j = 0; j < this.borders.length; j++) {
	                    b = this.borders[j];
	                    if (b.legd - b.regd == 0)
	                        continue;
	                    var angle;
	                    if (b.v == vidx_bst) {
	                        angle = VectorCalc.angle(this.ves[b.w].sub(v).normal(), v1.sub(v0).normal(), this.normal);
	                        if (angle >= bst_bidx_reg_angle) {
	                            bst_bidx_reg_angle = angle;
	                            bidx_reg = j;
	                        }
	                    }
	                    else if (b.w == vidx_bst) {
	                        angle = VectorCalc.angle(this.ves[b.v].sub(v).normal(), v1.sub(v0).normal(), this.normal);
	                        if (angle >= bst_bidx_leg_angle) {
	                            bst_bidx_leg_angle = angle;
	                            bidx_leg = j;
	                        }
	                    }
	                }
	                var bcout;
	                var b1_i = this.find_edge(vidx_bst, b0.v);
	                var b2_i = this.find_edge(b0.w, vidx_bst);
	                if (b1_i >= 0) {
	                    b1_ = this.borders[b1_i];
	                    this.ves_usecount[b1_.v]--;
	                    this.ves_usecount[b1_.w]--;
	                    bidx_reg = -1;
	                    bidx_leg = b1_.legd;
	                    b1_.legd = -1;
	                    b1_.regd = -1;
	                    b1_.open = false;
	                    b1_ = null;
	                }
	                if (b2_i >= 0) {
	                    b2_ = this.borders[b2_i];
	                    this.ves_usecount[b2_.v]--;
	                    this.ves_usecount[b2_.w]--;
	                    bidx_leg = -1;
	                    bidx_reg = b2_.regd;
	                    b2_.legd = -1;
	                    b2_.regd = -1;
	                    b2_.open = false;
	                    b2_ = null;
	                }
	                if (b1_i < 0) {
	                    b1_ = new ProcessSurfaceTriangleFill_Edge(b0.v, vidx_bst);
	                    {
	                        this.ves_usecount[b1_.v]++;
	                        this.ves_usecount[b1_.w]++;
	                        b1_.legd = b0.legd;
	                        b1_.regd = bidx_reg;
	                        bcout = this.borders.length;
	                        this.borders.push(b1_);
	                        this.borders[b1_.legd].regd = bcout;
	                        this.borders[bidx_reg].legd = bcout;
	                    }
	                }
	                if (b2_i < 0) {
	                    b2_ = new ProcessSurfaceTriangleFill_Edge(vidx_bst, b0.w);
	                    {
	                        this.ves_usecount[b2_.v]++;
	                        this.ves_usecount[b2_.w]++;
	                        b2_.legd = bidx_leg;
	                        b2_.regd = b0.regd;
	                        bcout = this.borders.length;
	                        this.borders.push(b2_);
	                        this.borders[b2_.regd].legd = bcout;
	                        this.borders[bidx_leg].regd = bcout;
	                    }
	                }
	                this.triangles.push(b0.v, b0.w, vidx_bst);
	                this.ves_usecount[b0.v]--;
	                this.ves_usecount[b0.w]--;
	                b0.legd = -1;
	                b0.regd = -1;
	                b0.open = false;
	                improve++;
	                if (this.enablestepinto)
	                    break;
	            }
	            return improve;
	        }
	    }
	    ProcessSurfaceTriangleFill.debug_step_max = Number.MAX_VALUE;
	    return ProcessSurfaceTriangleFill;
	})();
	class ProcessSurfaceTriangleFill_Edge {
	    constructor(v, w) {
	        this.legd = -1; // left edge index
	        this.regd = -1;
	        this.open = true;
	        this.v = v;
	        this.w = w;
	    }
	}

	class GeometryStructureOutMeshData {
	    static Write(geom) {
	        var res = new MeshData();
	        var i;
	        res.surfaces.push(0);
	        for (i = 0; i < geom.surfaces.length; i++) {
	            this.WriteSurface(res, geom, geom.surfaces[i]);
	            res.surfaces.push(res.triangles.length);
	        }
	        return res;
	    }
	    static WriteSurface(dst, geom, surface) {
	        var gsf = ProcessSurfaceTriangleFill.FillTriangle(geom.ves, surface.indices, surface.sections, surface.normal);
	        var mapping = new Array();
	        mapping.length = geom.ves.length;
	        var j;
	        for (j = 0; j < geom.ves.length; j++) {
	            mapping[j] = -1;
	        }
	        for (j = 0; j < gsf.triangles.length; j++) {
	            var index = gsf.triangles[j];
	            var mapindex;
	            if (mapping[index] < 0) {
	                var p = geom.ves[index];
	                var n = surface.normal;
	                var v = new VertexData();
	                v.pos = p.clone();
	                v.normal = n.clone();
	                dst.ves.push(v);
	                mapindex = dst.ves.length - 1;
	                mapping[index] = mapindex;
	            }
	            else {
	                mapindex = mapping[index];
	            }
	            dst.triangles.push(mapindex);
	        }
	    }
	}

	class ShapeOperationExpand {
	    constructor() {
	        this.ves_close = [];
	    }
	    static Expand(ves, normal, value, unit = CalcConst.unit, mix = float3.lerp) {
	        var pvle = new ShapeOperationExpand();
	        return pvle.Expand(ves, normal, value, unit, mix);
	    }
	    Expand(ves, normal, value, unit = CalcConst.unit, mix = float3.lerp) {
	        this.mix = mix;
	        var raw_ves = ves;
	        if (raw_ves.length < 2)
	            return;
	        var i, j;
	        var dir, dir1;
	        var out;
	        var headdir;
	        var u, v, w;
	        var eg;
	        var sign = MathCalc.sign(value);
	        var isLoop = raw_ves[0].nearequals(raw_ves[raw_ves.length - 1], CalcConst.dis_err);
	        if (isLoop)
	            raw_ves[raw_ves.length - 1] = raw_ves[0].clone();
	        var es = new EdgeStructure();
	        es.normal = normal;
	        this.es = es;
	        headdir = float3.dir(ves[0], ves[1]);
	        out = headdir.cross(normal).scale(value);
	        var cves = ves.concat();
	        if (!isLoop) {
	            cves.unshift(ves[0].add(ves[0].sub(ves[1]).normal()));
	            cves.push(ves[ves.length - 1].add(ves[ves.length - 1].sub(ves[ves.length - 2]).normal()));
	        }
	        else {
	            cves.unshift(ves[ves.length - 2]);
	            cves.push(ves[1]);
	        }
	        var dot;
	        var dirs = [];
	        var m;
	        for (i = 0; i < cves.length - 1; i++) {
	            dir = float3.dir(cves[i], cves[i + 1]);
	            dirs.push(dir);
	        }
	        var sides = [];
	        {
	            var side, side1;
	            for (i = 0; i < cves.length - 1; i++) {
	                dir = dirs[i];
	                var dot = Math.abs(dir.dot(normal));
	                if (dot > 1 - CalcConst.dot_err)
	                    continue;
	                sides[i] = dir.cross(normal).normal();
	            }
	            for (i = 0; i < cves.length - 1; i++) {
	                side = sides[i];
	                dir = dirs[i];
	                if (!side)
	                    continue;
	                for (j = i + 1; j < cves.length - 1; j++) {
	                    side1 = sides[j];
	                    dir1 = dirs[j];
	                    if (side1)
	                        break;
	                    dot = dir1.dot(normal);
	                    if (dot * dot > 1 - CalcConst.nearzero) {
	                        side1 = side.clone();
	                    }
	                    else {
	                        m = new tensor3();
	                        var angle = VectorCalc.angle(dir, dir1, normal);
	                        m.rotate(angle, normal);
	                        side1 = m.mulvector(side);
	                    }
	                    sides[j] = side1;
	                    side = side1;
	                    dir = dir1;
	                }
	                i = j - 1;
	            }
	            for (i = cves.length - 2; i >= 0; i--) {
	                side = sides[i];
	                dir = dirs[i];
	                if (!side)
	                    continue;
	                for (j = i - 1; j >= 0; j--) {
	                    side1 = sides[j];
	                    dir1 = dirs[j];
	                    if (side1)
	                        break;
	                    dot = dir1.dot(normal);
	                    if (dot * dot > 1 - CalcConst.nearzero) {
	                        side1 = side.clone();
	                    }
	                    else {
	                        m = new tensor3();
	                        m.rotate(VectorCalc.angle(dir, dir1, normal), normal);
	                        side1 = m.mulvector(side);
	                    }
	                    sides[j] = side1;
	                    side = side1;
	                    dir = dir1;
	                }
	                i = j + 1;
	            }
	            this.sides = sides;
	        }
	        //for (i = 0; i < sides.length; i++) {
	        //sides[i] = sides[i].scale(value);
	        //}
	        var eves = [];
	        eves.push(cves[0].clone());
	        for (i = 1; i < cves.length - 1; i++) {
	            u = cves[i - 1];
	            v = cves[i];
	            w = cves[i + 1];
	            side = sides[i - 1];
	            side1 = sides[i];
	            dir = dirs[i - 1];
	            dir1 = dirs[i];
	            var cutn = dir.add(dir1).normal();
	            out = side.cancel(cutn).normal();
	            var dot = out.dot(side);
	            var hit = (Math.abs(dot) > CalcConst.nearzero) ? v.advance(out, (value / dot)) : v.advance(side, value);
	            var vclone = v.clone();
	            vclone.fill(hit);
	            eves.push(vclone);
	        }
	        this.eves = eves;
	        for (i = 1; i < eves.length - 1; i++) {
	            v = eves[i];
	            w = eves[i + 1];
	            dir = dirs[i];
	            //if (v.nearequals(w, CalcConst.dis_err))continue;
	            if (w.sub(v).dot(dir) > -CalcConst.nearzero) {
	                eg = this.AddCut(v, w, sign);
	                eg.usermark = i;
	            }
	            this.Rebuild();
	        }
	        this.Rebuild();
	        //return eves;
	        this.ves_close.length = 0;
	        lstool.fill(this.ves_close, false, this.es.ves.length);
	        //////////      es .  clearup
	        es.calc_ready = false;
	        if (es.ves.length > 1) {
	            es.divide_overlaping();
	            es.divide_crossing();
	            es.simplify_ves_replace_duplicated(unit);
	            es.simplify_ves_remove_unuse();
	            es.delete_empty();
	        }
	        else {
	            es.delete_duplicate();
	        }
	        if (isLoop)
	            es.delete_noneloop();
	        if (isLoop) {
	            var vl = new Shape();
	            vl.ves = ves.concat();
	            vl.ves.pop();
	            var loop_sign = vl.IsPositive(normal, unit) ? +1 : -1;
	            for (i = 0; i < es.ves.length; i++) {
	                if (loop_sign * value > 0) {
	                    if (vl.ContainPointANGLESUM(es.ves[i]) != 1)
	                        continue;
	                    this.ves_close[i] = true;
	                }
	                else {
	                    if (vl.ContainPointANGLESUM(es.ves[i]) != 0)
	                        continue;
	                    this.ves_close[i] = true;
	                }
	            }
	        }
	        this.Rebuild();
	        //////////      path
	        var path = [];
	        if (es.egs.length == 0)
	            return path;
	        var head;
	        var headdir;
	        var headn;
	        var bst_head;
	        var bst_headedge;
	        var bst_headdir;
	        var bst_headn;
	        var bst_angle;
	        head = 0;
	        eg = es.egs[0];
	        head = eg.v;
	        path.push(es.ves[head]);
	        head = eg.w;
	        path.push(es.ves[head]);
	        headdir = es.ves[eg.w].sub(es.ves[eg.v]).normal();
	        headn = headdir.cross(es.normal);
	        var egsusage = [];
	        lstool.init(egsusage, false, es.egs.length);
	        egsusage[0] = true;
	        var vesuse = [];
	        lstool.init(vesuse, false, es.ves.length);
	        vesuse[eg.v] = true;
	        vesuse[eg.w] = true;
	        while (true) {
	            bst_head = -1;
	            bst_headedge = -1;
	            bst_headdir = null;
	            bst_angle = -Math.PI * 2;
	            for (i = 0; i < es.egs.length; i++) {
	                if (egsusage[i])
	                    continue;
	                eg = es.egs[i];
	                if (eg.v != head)
	                    continue;
	                var dir = es.ves[eg.w].sub(es.ves[eg.v]).normal();
	                var angle = VectorCalc.angle(headdir, dir, es.normal); //放样方向的最外层连线
	                if (angle > bst_angle) {
	                    bst_head = eg.w;
	                    bst_headdir = dir;
	                    //bst_headn = headdir.cross(es.normal);
	                }
	            }
	            if (bst_head < 0)
	                break;
	            if (vesuse[bst_head]) {
	                egsusage[bst_headedge] = true;
	                path.push(es.ves[bst_head]);
	                break;
	            }
	            head = bst_head;
	            headdir = bst_headdir;
	            headn = bst_headn;
	            egsusage[bst_headedge] = true;
	            path.push(es.ves[bst_head]);
	            vesuse[bst_head] = true;
	        }
	        return path;
	    }
	    AddCut(v, w, sign) {
	        var i;
	        var eg;
	        var egv;
	        var egw;
	        var egn;
	        var cutn = float3.dir(v, w);
	        var cutv = v.clone();
	        var cutw = w.clone();
	        var cutout = cutn.cross(this.es.normal);
	        lstool.fill(this.ves_close, false, this.es.ves.length);
	        for (i = this.es.egs.length - 1; i >= 0; i--) {
	            eg = this.es.egs[i];
	            egv = this.es.ves[eg.v];
	            egw = this.es.ves[eg.w];
	            var hit = VectorCalc.SegmentCrossSegment(v, w, egv, egw);
	            if (!hit)
	                continue;
	            var eghit = this.mix(egv, egw);
	            eghit.fill(hit);
	            egn = float3.dir(egv, egw).cross(this.es.normal);
	            var d0 = sign * cutv.sub(hit).dot(egn);
	            var d1 = sign * cutw.sub(hit).dot(egn);
	            if (Math.max(d0, d1) < CalcConst.dis_err)
	                continue;
	            if (d0 < -CalcConst.dis_err) {
	                this.ves_close[this.es.addpoint(cutv)] = true;
	                cutv = cutv.clone();
	                cutv.fill(hit);
	            }
	            else if (d1 < -CalcConst.dis_err) {
	                this.ves_close[this.es.addpoint(cutw)] = true;
	                cutw = cutw.clone();
	                cutw.fill(hit);
	            }
	            var d2 = sign * egv.sub(hit).dot(cutout);
	            var d3 = sign * egw.sub(hit).dot(cutout);
	            if (Math.max(d2, d3) < CalcConst.dis_err)
	                continue;
	            if (d2 < -CalcConst.dis_err) {
	                this.ves_close[eg.v] = true;
	                eg.v = this.es.ves.push(eghit) - 1;
	            }
	            else if (d3 < -CalcConst.dis_err) {
	                this.ves_close[eg.w] = true;
	                eg.w = this.es.ves.push(eghit) - 1;
	            }
	        }
	        var res = this.es.addsegment(cutv, cutw);
	        this.ves_close[res.v] = false;
	        this.ves_close[res.w] = false;
	        return res;
	    }
	    Rebuild() {
	        var i;
	        var eg;
	        //clean up
	        for (i = 0; i < this.es.egs.length; i++) {
	            eg = this.es.egs[i];
	            if (this.ves_close[eg.v] != true && this.ves_close[eg.w] != true)
	                continue;
	            this.ves_close[eg.v] = true;
	            this.ves_close[eg.w] = true;
	            this.es.egs[i] = null;
	        }
	        for (i = this.es.egs.length - 1; i >= 0; i--) {
	            eg = this.es.egs[i];
	            if (!eg || this.ves_close[eg.v] != true && this.ves_close[eg.w] != true)
	                continue;
	            this.ves_close[eg.v] = true;
	            this.ves_close[eg.w] = true;
	            this.es.egs[i] = null;
	        }
	        for (i = this.es.egs.length - 1; i >= 0; i--) {
	            if (this.es.egs[i])
	                continue;
	            this.es.egs.splice(i, 1);
	        }
	    }
	}

	//The cutter's swept volume could be constructed by lofting a serial of swept profiles.
	class RouteVolume {
	    static closure(mesh, crosssection, path) {
	        var i;
	        var normal;
	        var voffset;
	        var ioffset;
	        var vertex;
	        var ves0 = [];
	        var triangles0 = [];
	        var ves1 = [];
	        var triangles1 = [];
	        crosssection.triangles.length = 0;
	        var indices = [];
	        for (i = 0; i < crosssection.lines.length; i += 2) {
	            indices.push(crosssection.lines[i]);
	        }
	        var ves = [];
	        for (i = 0; i < crosssection.ves.length; i++) {
	            ves.push(crosssection.ves[i].pos);
	        }
	        crosssection.triangles = ProcessSurfaceTriangleFill.FillTriangle(ves, indices, [0, indices.length], new float3(0, 0, 1)).triangles;
	        voffset = 0;
	        ioffset = 0;
	        normal = mesh.ves[voffset + crosssection.lines[1]].pos.sub(mesh.ves[voffset + crosssection.lines[0]].pos).crossnormalize(mesh.ves[voffset + crosssection.lines[3]].pos.sub(mesh.ves[voffset + crosssection.lines[2]].pos));
	        normal = normal.negate();
	        for (i = 0; i < crosssection.triangles.length; i++) {
	            vertex = mesh.ves[voffset + crosssection.triangles[i]].clone();
	            vertex.normal = normal;
	            ves0.push(vertex);
	            triangles0.push(ioffset + i);
	        }
	        triangles0 = triangles0.reverse();
	        if (normal.dot(path[0].sub(path[1]).normal()) < 0) {
	            normal = normal.negate();
	            triangles0 = triangles0.reverse();
	        }
            voffset = mesh.ves.length - crosssection.ves.length;
	        normal = mesh.ves[voffset + crosssection.triangles[1]].pos.sub(mesh.ves[voffset + crosssection.triangles[0]].pos).crossnormalize(mesh.ves[voffset + crosssection.triangles[2]].pos.sub(mesh.ves[voffset + crosssection.triangles[1]].pos));
	        ioffset =0;
	        for (i = 0; i < crosssection.triangles.length; i++) {
	            vertex = mesh.ves[voffset + crosssection.triangles[i]].clone();
	            vertex.normal = normal;
	            ves1.push(vertex);
	            triangles1.push(ioffset + i);
	        }
	        if (normal.dot(path[path.length - 1].sub(path[path.length - 2]).normal()) < 0) {
	            normal = normal.negate();
	            triangles1 = triangles1.reverse();
	        }
            var h = new bearx.MeshData();
	        lstool.attach(h.ves, ves0);
	        lstool.attach(h.triangles, triangles0);
            mesh.head=h;
            var e = new bearx.MeshData();
	        lstool.attach(e.ves, ves1);
	        lstool.attach(e.triangles, triangles1);
            mesh.tail=e;
	    }
	    static Build(dst_volume, swept_profile, swept_path, normal, flipx, travelFunction = null, use_lock_up = false) {
	        if (travelFunction == null)
	            travelFunction = RouteVolume.DefaultTravelFunction;
	        swept_profile.BuildBoxBound();
	        var info = RouteVolume.CalculateProfile(swept_profile, swept_path, normal, flipx);
            swept_profile.isLoop=info.isLoop
	        var belt = info.belt;
	        if (belt.length < 4)
	            return null;
	        {
	            var rot = new tensor3t();
	            var dir;
	            var side;
	            rot.rotate(90 * CalcConst.DEGREES_TO_RADIANS, f3(1, 0, 0));
	            var i;
	            var side;
	            for (i = 0; i < belt.length - 2; i++) {
	                dir = float3.dir(belt[i + 0], belt[i + 2]);
	                if (Math.abs(dir.dot(normal)) > 1 - CalcConst.dot_err)
	                    continue;
	                side = float3.dir(belt[i + 0], belt[i + 1]);
	                break;
	            }
	            if (normal.cross(side).dot(dir) < 0) {
	                rot.rotate(180 * CalcConst.DEGREES_TO_RADIANS, f3(1, 0, 0));
	            }
	            //swept_profile.applyMatrix(rot);
	        }
	        if (use_lock_up)
	            ExtrudeTool.ExtrudeRoute_LockUp(dst_volume, swept_profile, rot, belt, travelFunction);
	        else
	            ExtrudeTool.ExtrudeRoute(dst_volume, swept_profile, rot, belt, travelFunction);
	        return info;
	    }
	    static DefaultTravelFunction(vertex, targetpos, dir) {
	        var diff = targetpos.sub(vertex.pos);
	        var dux = dir.dot(diff);
	        vertex.uv.x += dux;
	    }
	    static CalculateProfile(swept_profile, swept_path, normal, flipx) {
	        var ves = swept_path;
	        var res = {};
	        res['swept_path'] = swept_path;
	        res['swept_path_expand'] = [];
	        res['belt'] = [];
	        if (ves.length < 2)
	            return res;
	        var pvle = new ShapeOperationExpand();
	        var deep = flipx ? -swept_profile.boxbound.size.x : +swept_profile.boxbound.size.x;
	        var sign_deep = MathCalc.sign(deep);
	        var expves = pvle.Expand(ves, normal, deep);
	        res['es'] = pvle.es;
	        res['eves'] = pvle.eves;
	        res['oves'] = pvle.oves;
	        var ves_expland = expves;
	        var belt = [];
	        var isLoop = ves[0].nearequals(ves[ves.length - 1], CalcConst.dis_err);
            res['isLoop'] = false;
	        if (isLoop)
	            ves[ves.length - 1] = ves[0].clone(),res['isLoop'] = true;
	        var copy = ExtrudeTool.processroute(ves);
	        var i, j, jstart;
	        var v0, v1, v2;
	        var w;
	        var pairs = [];
	        for (i = 1, jstart = 0; i < copy.length - 1; i++) {
	            v0 = copy[i - 1], v1 = copy[i + 0], v2 = copy[i + 1];
	            var r01 = pvle.sides[i - 1].scale(sign_deep);
	            var r12 = pvle.sides[i + 0].scale(sign_deep);
	            var vjoint = r01.add(r12).normal();
	            var bst_dis = swept_profile.boxbound.size.x + CalcConst.dis_err;
	            var found = false;
	            for (j = jstart; j < ves_expland.length; j++) {
	                w = ves_expland[j];
	                var vw = w.sub(v1);
	                var vwlen = vw.length;
	                if (Math.abs(vwlen - Math.abs(vw.dot(vjoint))) > CalcConst.dis_err)
	                    continue;
	                if (Math.abs(vw.dot(r01)) > bst_dis)
	                    continue;
	                pairs.push(i, j);
	                jstart = j;
	                found = true;
	                break;
	            }
	            if (found)
	                continue;
	            bst_dis = Number.MAX_VALUE;
	            var bst_w;
	            for (j = 0; j < ves_expland.length; j++) {
	                w = ves_expland[j];
	                var vw = w.sub(v1);
	                var vwlen = vw.length;
	                if (vwlen > bst_dis)
	                    continue;
	                bst_dis = vwlen;
	                bst_w = j;
	                found = true;
	            }
	            if (!found)
	                continue;
	            pairs.push(i, bst_w);
	        }
	        for (i = 0; i < pairs.length; i += 2) {
	            belt.push(copy[pairs[i + 0]]);
	            belt.push(ves_expland[pairs[i + 1]]);
	        }
	        res['swept_path'] = ves;
	        res['swept_path_expand'] = ves_expland;
	        res['belt'] = belt;
	        return res;
	    }
	}

	class ShapeVolume {
	    static ToGeometryStrutures(vectorloop) {
	        var res = new Array();
	        var i, j;
	        var vl;
	        var gs;
	        var gf;
	        for (i = 0; i < vectorloop.length; i++) {
	            vl = vectorloop[i];
	            gs = new GeometryStructure();
	            gf = new GeometrySurface();
	            gs.surfaces.push(gf);
	            gs.ves = vl.ves.concat();
	            gf.sections = vl.sections.concat();
	            gf.normal = vl.normal;
	            for (j = 0; j < vl.ves.length; j++) {
	                gf.indices.push(j);
	            }
	            res.push(gs);
	        }
	        return res;
	    }
	}

	class ColorHelper {
	    constructor() {
	        this.name = '';
	        this.name = '';
	    }
	    static alpha(color) {
	        var alpha = ((color >>> 24)) / 255;
	        if (alpha < 0.1) {
	            alpha = 1;
	        }
	        return alpha;
	    }
	    static RGBbit(color) {
	        return color & 0xffffff;
	    }
	    static colorstr(color) {
	        var res = "";
	        var num = color.toString(16);
	        for (var i = 0; i < 6 - num.length; i++) {
	            res += "0";
	        }
	        res += num;
	        return res;
	    }
	    static RGBstr(color) {
	        return ColorHelper.colorstr(ColorHelper.RGBbit(color));
	    }
	    static scalecolor(color, scale) {
	        var bit = ColorHelper.RGBbit(color);
	        var bbit = ((bit >> 0) & 0x0000FF);
	        var gbit = ((bit >> 8) & 0x0000FF);
	        var rbit = ((bit >> 16) & 0x0000FF);
	        var abit = ((bit >> 24) & 0x0000FF);
	        return (abit << 24) + (rbit * scale << 16) + (gbit * scale << 8) + (bbit * scale << 0);
	    }
	}

	class SVGHelper {
	    constructor(element) {
	        this.src = element;
	    }
	    set attr(attr) {
	        this.src.attr(attr);
	    }
	    static attrempty() {
	        var attr = {};
	        attr['fill-opacity'] = 0;
	        return attr;
	    }
	    static attrstoke(attr, color, strokesize) {
	        attr['strokeWidth'] = strokesize;
	        attr['stroke'] = "#" + ColorHelper.RGBstr(color);
	        attr['stroke-opacity'] = ColorHelper.alpha(color);
	    }
	    static attrfill(attr, color) {
	        attr['fill'] = "#" + ColorHelper.RGBstr(color);
	        attr['fill-opacity'] = ColorHelper.alpha(color);
	    }
	    static attrfillnone(attr) {
	        attr['fill-opacity'] = 0;
	    }
	    clear() {
	        var list = this.src.children();
	        for (var i = 0; i < list.length; i++) {
	            list[i].remove();
	        }
	    }
	    destroy() {
	        this.src.remove();
	    }
	    get children() {
	        return this.src.children();
	    }
	    group() {
	        var el = this.src.g();
	        return el;
	    }
	    line(a, b, size = 1, color = 0x60544F) {
	        var el = this.src.line(a.x, a.y, b.x, b.y);
	        var attr = {};
	        SVGHelper.attrstoke(attr, color, size);
	        el.attr(attr);
	        return el;
	    }
	    pathoffset(ves, offset, size = 1, color = 0x60544F) {
	        var i;
	        var u = ves[0];
	        var comm = "";
	        comm += "M" + (u.x + offset.x) + ',' + (u.y + offset.y);
	        for (i = 1; i < ves.length; i++) {
	            u = ves[i];
	            comm += "L" + (u.x + offset.x) + ',' + (u.y + offset.y);
	        }
	        var el = this.src.path(comm);
	        var attr = {};
	        SVGHelper.attrstoke(attr, color, size);
	        SVGHelper.attrfillnone(attr);
	        el.attr(attr);
	        return el;
	    }
	    path(ves, size = 1, color = 0x60544F) {
	        var i;
	        var u = ves[0];
	        var comm = "";
	        comm += "M" + u.x + ',' + u.y;
	        for (i = 1; i < ves.length; i++) {
	            u = ves[i];
	            comm += "L" + u.x + ',' + u.y;
	        }
	        var el = this.src.path(comm);
	        var attr = {};
	        SVGHelper.attrstoke(attr, color, size);
	        SVGHelper.attrfillnone(attr);
	        el.attr(attr);
	        return el;
	    }
	    complexloop(ves, sections, size = 1, color = 0xf4eee6) {
	        var i, j;
	        var g = this.src.g('complexloop');
	        for (j = 0; j < sections.length - 1; j++) {
	            var s0 = sections[j];
	            var slen = sections[j + 1] - s0;
	            var comm = "";
	            var u = ves[s0];
	            comm += "M" + u.x + ',' + u.y;
	            for (i = 1; i < ves.length; i++) {
	                u = ves[i + s0];
	                comm += "L" + u.x + ',' + u.y;
	            }
	            u = ves[s0];
	            comm += "L" + u.x + ',' + u.y;
	            var attr = SVGHelper.attrempty();
	            SVGHelper.attrstoke(attr, color, size);
	            var el = g.path(comm);
	            el.attr(attr);
	        }
	        return g;
	    }
	    loop(ves, size = 1, color = 0xF4EEE6) {
	        var i;
	        var u = ves[0];
	        var comm = "";
	        comm += "M" + u.x + ',' + u.y;
	        for (i = 1; i < ves.length; i++) {
	            u = ves[i];
	            comm += "L" + u.x + ',' + u.y;
	        }
	        u = ves[0];
	        comm += "L" + u.x + ',' + u.y;
	        var el = this.src.path(comm);
	        var attr = SVGHelper.attrempty();
	        SVGHelper.attrstoke(attr, color, size);
	        el.attr(attr);
	        return el;
	    }
	    surface(ves, ids, color = 0xCCC1BC, stokesize = 1) {
	        var i;
	        for (i = 0; i < ids.length - 2; i += 3) {
	            var u = ves[ids[i + 0]];
	            var v = ves[ids[i + 1]];
	            var w = ves[ids[i + 2]];
	            var el = this.src.polygon([u.x, u.y, v.x, v.y, w.x, w.y]);
	            var attr = {};
	            SVGHelper.attrstoke(attr, color, stokesize);
	            SVGHelper.attrfill(attr, color);
	            el.attr(attr);
	        }
	    }
	    triangle(u, v, w, color = 0xCCC1BC, bordersize = 1) {
	        var el = this.src.polygon([u.x, u.y, v.x, v.y, w.x, w.y, u.x, u.y]);
	        el.attr({
	            fill: "#" + ColorHelper.RGBstr(color), 'fill-opacity': ColorHelper.alpha(color), stroke: "#" + ColorHelper.RGBstr(color), strokeWidth: bordersize
	        });
	        return el;
	    }
	    text(pos, text, color = 0x000000, fontsize = 15, fontweight = 500) {
	        var el = this.src.text(pos.x, pos.y, text);
	        el.attr({
	            fill: "#" + ColorHelper.RGBstr(color), 'fill-opacity': ColorHelper.alpha(color),
	            'font-size': fontsize,
	            'cursor': 'default',
	            'font-weight': fontweight,
	        });
	        return el;
	    }
	    cycle(origin, range, fill, fillcolor, bordersize, bordercolor) {
	        var points = new Array();
	        var dAngle = 20;
	        var v = new float3(1, 1, 1);
	        var up = new float3(0, 0, 1);
	        v = v.sub(v.proj(up));
	        v = v.normal();
	        v = v.scale(range);
	        var mat = tensor3.eular(up.scale(dAngle * CalcConst.DEGREES_TO_RADIANS));
	        var point;
	        var i;
	        for (i = 0; i <= 360; i += dAngle) {
	            v = mat.mulvector(v);
	            point = origin.add(v);
	            points.push(point);
	        }
	        var poly = new Array();
	        for (i = 0; i < points.length; i++) {
	            poly.push(points[i].x, points[i].y);
	        }
	        var el = this.src.polygon(poly);
	        if (fill) {
	            el.attr({
	                fill: "#" + ColorHelper.RGBstr(fillcolor), 'fill-opacity': ColorHelper.alpha(fillcolor),
	                strokeWidth: bordersize, stroke: "#" + ColorHelper.colorstr(bordercolor)
	            });
	        }
	        else {
	            el.attr({
	                strokeWidth: bordersize, stroke: "#" + ColorHelper.RGBstr(bordercolor)
	            });
	        }
	        return el;
	    }
	}

	class VolumeTool {
	    static Shape2Volume(vl, z0, z1, tag, usermark) {
	        var geom = new GeometryStructure();
	        var i, j;
	        geom.info = new Object();
	        geom.info['tag'] = tag;
	        geom.info['usermark'] = usermark;
	        var normal = vl.normal.clone();
	        if (z0 > z1)
	            normal = normal.negate();
	        //����
	        for (i = 0; i < vl.ves.length; i++) {
	            geom.ves.push(vl.ves[i].add(normal.scale(z1)));
	        }
	        //�ײ�
	        for (i = 0; i < vl.ves.length; i++) {
	            geom.ves.push(vl.ves[i].add(normal.scale(z0)));
	        }
	        var surface;
	        surface = new GeometrySurface();
	        { //����
	            for (i = 0; i < vl.ves.length; i++) {
	                surface.indices.push(i);
	            }
	            surface.sections = vl.sections.concat();
	            surface.normal = vl.normal.clone();
	            surface.CalculateCenter(geom.ves);
	            surface.CalculateRadius(geom.ves);
	            geom.surfaces.push(surface);
	        }
	        surface = new GeometrySurface();
	        { //����
	            for (i = 0; i < vl.sections.length - 1; i++) {
	                var s0 = vl.sections[i];
	                var s1 = vl.sections[i + 1];
	                var slen = s1 - s0;
	                for (j = 0; j < slen; j++) {
	                    surface.indices.push(s1 - 1 - j + vl.length);
	                }
	            }
	            surface.sections = vl.sections.concat();
	            surface.normal = vl.normal.negate();
	            surface.CalculateCenter(geom.ves);
	            surface.CalculateRadius(geom.ves);
	            geom.surfaces.push(surface);
	        }
	        // ���洦��
	        //   1 �����������ϲ��ҽӽ��ı�
	        //   2 ��Ӧ�Ĳ�����д���
	        //   3 �޸Ļ��ÿղ�������
	        var sideloop;
	        for (i = 0; i < surface.sections.length - 1; i++) {
	            var s0 = surface.sections[i];
	            var slen = surface.sections[i + 1] - s0;
	            for (j = 0; j < slen; j++) {
	                var iv = surface.indices[j + s0];
	                var iw = surface.indices[((j + 1) % slen) + s0];
	                sideloop = new Array();
	                sideloop.push(iw, iv, iv - vl.length, iw - vl.length);
	                var v0 = geom.ves[sideloop[0]];
	                var v1 = geom.ves[sideloop[1]];
	                var v2 = geom.ves[sideloop[2]];
	                var sidesurface = new GeometrySurface();
	                sidesurface.indices = sideloop;
	                sidesurface.sections = [0, 4];
	                sidesurface.normal = v1.sub(v0).cross(v2.sub(v1)).normal();
	                sidesurface.CalculateCenter(geom.ves);
	                sidesurface.CalculateRadius(geom.ves);
	                geom.surfaces.push(sidesurface);
	            }
	        }
	        geom.Simplify();
	        return geom;
	    }
	    static GeometryStructure2Buffer(geom) {
	        var indices = [];
	        var vertices = [];
	        var normals = [];
	        var uvs = [];
	        var res = new THREE.BufferGeometry();
	        var i;
	        for (i = 0; i < geom.surfaces.length; i++) {
	            var index0 = indices.length;
	            VolumeTool.GeometrySurface2Buffer(geom, geom.surfaces[i], indices, vertices, normals, uvs);
	            var index1 = indices.length;
	            res.addGroup(index0, index1 - index0, i);
	        }
	        res.setIndex(indices);
	        res.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
	        res.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
	        res.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	        return res;
	    }
	    static GeometrySurface2Buffer(geom, surface, indices, vertices, normals, uvs) {
	        var gsf = ProcessSurfaceTriangleFill.FillTriangle(geom.ves, surface.indices, surface.sections, surface.normal);
	        var mapping = new Array();
	        mapping.length = geom.ves.length;
	        var j;
	        for (j = 0; j < geom.ves.length; j++) {
	            mapping[j] = -1;
	        }
	        var axis_x = float3.dir(geom.ves[surface.indices[0]], geom.ves[surface.indices[1]]);
	        var axis_y = surface.normal.cross(axis_x).normal();
	        for (j = 0; j < gsf.triangles.length; j++) {
	            var index = gsf.triangles[j];
	            var mapindex;
	            if (mapping[index] < 0) {
	                mapindex = Math.floor(vertices.length / 3);
	                mapping[index] = mapindex;
	                var p = geom.ves[index];
	                var n = surface.normal;
	                vertices.push(p.x, p.y, p.z);
	                normals.push(n.x, n.y, n.z);
	                uvs.push(p.dot(axis_x), p.dot(axis_y));
	            }
	            else {
	                mapindex = mapping[index];
	            }
	            indices.push(mapindex);
	        }
	    }
	    static GeometryStructure2SVG(element, geom, color) {
	        var res = new SVGHelper(element);
	        var i;
	        for (i = 0; i < geom.surfaces.length; i++) {
	            var surface = geom.surfaces[i];
	            var gsf;
	            try {
	                gsf = ProcessSurfaceTriangleFill.FillTriangle(geom.ves, surface.indices, surface.sections, surface.normal);
	            }
	            catch (error) {
	                console.log("error fill surface", geom.toString(), i);
	                console.log(error);
	                throw (error);
	            }
	            res.surface(geom.ves, gsf.triangles, color);
	        }
	    }
	    static GeometryStructure2Mesh(geom, color = 0xffffff) {
	        var buffgeom = VolumeTool.GeometryStructure2Buffer(geom);
	        var labmertMat = new THREE.MeshLambertMaterial();
	        labmertMat.color = new THREE.Color(color);
	        var mesh = new THREE.Mesh(buffgeom, labmertMat);
	        mesh.receiveShadow = true;
	        mesh.castShadow = true;
	        return mesh;
	    }
	}

	class Coordinate {
	    constructor(origin = null, y = null, z = null, x = null) {
	        this.origin = new float3();
	        this.x = new float3();
	        this.y = new float3();
	        this.z = new float3();
	        if (origin != null)
	            this.origin = origin;
	        if (y != null)
	            this.y = y;
	        if (z != null)
	            this.z = z;
	        if (x != null)
	            this.x = x;
	    }
	    toMatrix() {
	        var ans = tensor3.createByAxisYZ(this.y, this.z);
	        return ans;
	    }
	    applyMatrix(value) {
	        this.x = value.mulvector(this.x);
	        this.y = value.mulvector(this.y);
	        this.z = value.mulvector(this.z);
	    }
	    toRay() {
	        return new Ray(this.origin, this.y);
	    }
	    clone() {
	        var copy = new Coordinate(this.origin.clone(), this.y.clone(), this.z.clone(), this.x.clone());
	        return copy;
	    }
	    equals(value) {
	        var a = this;
	        var b = value;
	        return a.origin.equals(b.origin) && a.x.equals(b.x) && a.y.equals(b.y) && a.z.equals(b.z);
	    }
	}

	class ShapeOperationToSurface {
	    static Surface(vectorloop) {
	        var gs = new GeometryStructure();
	        var gf = new GeometrySurface();
	        gs.surfaces.push(gf);
	        gs.ves = vectorloop.ves.concat();
	        gf.sections = vectorloop.sections.concat();
	        gf.normal = vectorloop.normal;
	        var j;
	        for (j = 0; j < vectorloop.ves.length; j++) {
	            gf.indices.push(j);
	        }
	        return gs;
	    }
	}

	class VectorLoopCalc {
	    static Add(a, b) {
	        return ShapeOperationAdd.Add(a, b);
	    }
	    static Expand(ves, normal, value, unit = CalcConst.unit, mix = float3.lerp) {
	        return ShapeOperationExpand.Expand(ves, normal, value, unit, mix);
	    }
	    static Surface(vectorloop) {
	        return ShapeOperationToSurface.Surface(vectorloop);
	    }
	}

	class KeyCodeHelper {
	    static keycodetocommand(keycode, key, alt, ctrl, shift) {
	        var lead = "";
	        if (alt)
	            lead += "alt,";
	        if (ctrl)
	            lead += "ctrl,";
	        if (shift)
	            lead += "shift,";
	        var value;
	        switch (keycode) {
	            case 13:
	                value = "enter";
	                break;
	            case 16: // shift
	                value = "";
	                break;
	            case 17: // ctrl
	                value = "";
	                break;
	            case 18: // alt
	                value = "";
	                break;
	            case 8:
	                value = "backspace";
	                break;
	            case 32:
	                value = "space";
	                break;
	            case 27:
	                value = "escape";
	                break;
	            case 46:
	                value = "delete";
	                break;
	            default:
	                value = key;
	                break;
	        }
	        if (value == "" && lead.length > 0)
	            lead = lead.substr(0, lead.length - 1);
	        if (value == "" && lead == "") {
	            switch (keycode) {
	                case 16: // shift
	                    value = "shift";
	                    break;
	                case 17: // ctrl
	                    value = "ctrl";
	                    break;
	                case 18: // alt
	                    value = "alt";
	                    break;
	            }
	        }
	        return lead + value;
	    }
	    static keycode2numberpad(keycode, key) {
	        if (!MathCalc.betweenEqual(keycode, 96, 105)) {
	            return null;
	        }
	        var value = key;
	        if (MathCalc.betweenEqual(Number(value), 0, 9))
	            return value;
	        return null;
	    }
	    static keycode2number(keycode, key) {
	        if (!MathCalc.betweenEqual(keycode, 48, 57)) {
	            return null;
	        }
	        var value = key;
	        if (MathCalc.betweenEqual(Number(value), 0, 9))
	            return value;
	        return null;
	    }
	}

	class bforgable {
	    constructor(name) {
	        this.lineindex = -1;
	        this.name = null;
	        this.forge = null;
	        this.interfaces = new Map();
	        this._updatelevel = Number.MAX_VALUE;
	        this.exist = true;
	        this.name = name;
	    }
	    set updatelevel(value) {
	        if (value == -1)
	            this._updatelevel = -1;
	        else if (value > this._updatelevel)
	            this._updatelevel = value;
	    }
	    get updatelevel() {
	        return this._updatelevel;
	    }
	    ready() {
	    }
	    dispose() {
	        this.forge = null;
	    }
	    selfdestroy() {
	        this.forge.eject(this);
	    }
	}

	class bproperty {
	    constructor(name) {
	        this.name = name;
	    }
	}

	class bobj extends bforgable {
	    constructor(name) {
	        super(name);
	        this.propertys = new Array();
	        this.actived = false;
	        this.visible = true;
	    }
	    frechcache(type) {
	        var cache = this.getproperty(type);
	        if (cache == null) {
	            cache = new type();
	            this.pushproperty(cache);
	        }
	        return cache;
	    }
	    pushproperty(...propertys) {
	        var i;
	        for (i = 0; i < propertys.length; i++) {
	            var property = propertys[i];
	            property.id = this.propertys.length;
	            this.propertys.push(property);
	        }
	    }
	    ejectproperty(...propertys) {
	        var i;
	        for (i = 0; i < propertys.length; i++) {
	            var property = propertys[i];
	            if (propertys[i] instanceof bproperty) {
	                lstool.remove_item_orderless(this.propertys, property);
	            }
	            else if (typeof (property) == 'function') {
	                for (var j = 0; j < this.propertys.length; j++) {
	                    if (this.propertys[j] instanceof property) {
	                        this.propertys[j] = this.propertys[this.propertys.length - 1];
	                        this.propertys.pop();
	                        break;
	                    }
	                }
	            }
	        }
	    }
	    getpropertys(tag) {
	        var ans = new Array();
	        var slot;
	        var i;
	        if (typeof (tag) == 'string') {
	            for (i = 0; i < this.propertys.length; i++) {
	                slot = this.propertys[i];
	                if (slot.name == tag) {
	                    ans.push(slot);
	                }
	            }
	        }
	        else if (typeof (tag) == 'function') {
	            for (i = 0; i < this.propertys.length; i++) {
	                slot = this.propertys[i];
	                if (slot instanceof tag) {
	                    ans.push(slot);
	                }
	            }
	        }
	        return ans;
	    }
	    getproperty(tag) {
	        var slot;
	        var i;
	        if (typeof (tag) == 'function') {
	            for (i = 0; i < this.propertys.length; i++) {
	                slot = this.propertys[i];
	                if (slot instanceof tag) {
	                    return slot;
	                }
	            }
	        }
	        else if (typeof (tag) == 'string') {
	            for (i = 0; i < this.propertys.length; i++) {
	                slot = this.propertys[i];
	                if (slot.name == tag) {
	                    return slot;
	                }
	            }
	        }
	        else if (!isNaN(tag)) {
	            var index = tag;
	            if (index < 0 || this.propertys.length < tag)
	                return null;
	            return this.propertys[index];
	        }
	        return null;
	    }
	}

	class bfunc extends bforgable {
	    constructor(name) {
	        super(name != null ? name : "bfunc");
	    }
	}

	class ItemLog {
	    constructor(index, type, obj) {
	        this.index = index;
	        this.type = type;
	        this.obj = obj;
	    }
	}
	class ParamLog {
	    constructor(from, to) {
	        this.from = from;
	        this.to = to;
	    }
	}
	class DataLogCalculator {
	    static inver_paramlog(log) {
	        if (log == null)
	            return log;
	        return new ParamLog(log.to, log.from);
	    }
	    static generate_paramlog(raw, data, comparefunc) {
	        if (comparefunc(raw, data))
	            return;
	        return new ParamLog(raw, data);
	    }
	    static apply_listlog(data, logs, clone) {
	        var i;
	        var offset = 0;
	        for (i = 0; i < logs.length; i++) {
	            var dl = logs[i];
	            if (dl.type == 0) {
	                data.splice(dl.index + offset, 1);
	                offset--;
	            }
	            else {
	                data.splice(dl.index + offset, 0, clone(dl.obj));
	                offset++;
	            }
	        }
	    }
	    static check_listlog(raw, data, comparefunc) {
	        if (raw.length != data.length)
	            return false;
	        var i;
	        for (i = 0; i < raw.length; i++) {
	            if (!comparefunc(raw[i], data[i]))
	                return false;
	        }
	        return true;
	    }
	    static invert_listlog(logs) {
	        var res = new Array();
	        var i;
	        var offset = 0;
	        for (i = 0; i < logs.length; i++) {
	            var dl0 = logs[i];
	            var dl1;
	            if (dl0.type == 0) {
	                dl1 = new ItemLog(dl0.index + offset, 1, dl0.obj);
	                offset--;
	                res.push(dl1);
	            }
	            else {
	                dl1 = new ItemLog(dl0.index + offset, 0, dl0.obj);
	                offset++;
	                res.push(dl1);
	            }
	        }
	        return res;
	    }
	    static generate_listlog(raw, data, comparefunc, clone) {
	        var logs = new Array();
	        var i, j, k, l;
	        // find delete
	        for (i = 0, k = 0; i < raw.length; i++) {
	            j = k;
	            while (j < data.length) {
	                if (comparefunc(raw[i], data[j])) {
	                    break;
	                }
	                j++;
	            }
	            if (j >= data.length) {
	                // i delete
	                logs.push(new ItemLog(i, 0, clone(raw[i])));
	                j = i;
	            }
	            else {
	                for (l = k; l < j; l++) {
	                    logs.push(new ItemLog(i, 1, clone(data[l])));
	                }
	                k = j + 1;
	            }
	        }
	        for (l = k; l < data.length; l++) {
	            logs.push(new ItemLog(raw.length, 1, clone(data[l])));
	        }
	        return logs;
	    }
	}

	class DataHistroy extends bobj {
	    constructor() {
	        super("DataHistroy");
	        this.index = 0;
	        this.slots = new Array();
	    }
	    clear() {
	        this.index = 0;
	        this.slots.length = 0;
	    }
	    Go() {
	        if (this.index >= this.slots.length)
	            return;
	        this.slots[this.index].DataHistoryGo();
	        this.index++;
	    }
	    Back() {
	        if (this.index == 0)
	            return;
	        this.index--;
	        this.slots[this.index].DataHistoryBack();
	    }
	    Collect(datahistoryable) {
	        this.Push(datahistoryable.CollectHistory());
	    }
	    Push(datahistroy) {
	        if (datahistroy == null)
	            return;
	        this.slots.length = this.index; //cut-tail
	        this.slots.push(datahistroy);
	        this.index++;
	    }
	}

	class DataHistoryBackward extends bfunc {
	    constructor() {
	        super("DataHistoryBackward");
	    }
	    ready() {
	        this.history = this.forge.getslot(DataHistroy);
	        this.history.Back();
	        this.selfdestroy();
	    }
	}

	class DataHistoryForward extends bfunc {
	    constructor() {
	        super("DataHistoryForward");
	    }
	    ready() {
	        this.history = this.forge.getslot(DataHistroy);
	        this.history.Go();
	        this.selfdestroy();
	    }
	}

	let biuupdatelevel = /** @class */ (() => {
	    class biuupdatelevel {
	    }
	    biuupdatelevel.noupdate = -1;
	    biuupdatelevel.minorupdate = 1;
	    biuupdatelevel.majorupdate = Number.MAX_VALUE;
	    return biuupdatelevel;
	})();

	class converthreejs {
	    static tensor3matrix4(t, m) {
	        var tt = t.transposed();
	        var elms = m.elements;
	        lstool.copyrange(tt.el, elms, 0, 0, 3);
	        lstool.copyrange(tt.el, elms, 3, 4, 3);
	        lstool.copyrange(tt.el, elms, 6, 8, 3);
	    }
	    static matrix4tensor3(m) {
	        var res = new tensor3();
	        var elements = m.elements;
	        lstool.copyrange(elements, res.el, 0, 0, 3);
	        lstool.copyrange(elements, res.el, 4, 3, 3);
	        lstool.copyrange(elements, res.el, 8, 6, 3);
	        res.transpose();
	        return res;
	    }
	    static matrix4transform(m) {
	        var res = new tensor3t();
	        var elements = m.elements;
	        lstool.copyrange(elements, res.el, 0, 0, 3);
	        lstool.copyrange(elements, res.el, 4, 3, 3);
	        lstool.copyrange(elements, res.el, 8, 6, 3);
	        res.t[0] = elements[12];
	        res.t[1] = elements[13];
	        res.t[2] = elements[14];
	        res.transpose();
	        return res;
	    }
	    static vector3float3(v) {
	        return new float3(v.x, v.y, v.z);
	    }
	    static float3vector3(v) {
	        return new THREE.Vector3(v.x, v.y, v.z);
	    }
	}

	class object3tool {
	    static meshclone(src) {
	        return src.clone();
	    }
	    static setposition(src, value) {
	        src.position.set(value.x, value.y, value.z);
	    }
	    static setmatrix(src, t) {
	        var m = new THREE.Matrix4();
	        m.set(t.el[0], t.el[1], t.el[2], 0, t.el[3], t.el[4], t.el[5], 0, t.el[6], t.el[7], t.el[8], 0, 0, 0, 0, 1);
	        src.applyMatrix(m);
	    }
	    destory(src) {
	        var slot = src.children;
	        for (var i = 0; i < slot.length; i++) {
	            src.remove(slot[i]);
	        }
	        if (src.parent)
	            src.parent.remove(src);
	    }
	}
	class object3 extends THREE.Object3D {
	    constructor() {
	        super();
	    }
	    set_rotation(t) {
	        var m = new THREE.Matrix4();
	        m.set(t.el[0], t.el[1], t.el[2], 0, t.el[3], t.el[4], t.el[5], 0, t.el[6], t.el[7], t.el[8], 0, 0, 0, 0, 1);
	        this['applyMatrix'](m);
	    }
	    set_pos(value) {
	        this['position'].set(value.x, value.y, value.z);
	    }
	    get_pos() {
	        var v = this['position'];
	        return new float3(v.x, v.y, v.z);
	    }
	    push(value) {
	        super.add(value);
	    }
	    pop(value) {
	        super.remove(value);
	    }
	    removeat(index) {
	        super.remove(this.slots[index]);
	    }
	    get container() {
	        return this['parent'];
	    }
	    get slots() {
	        return this['children'];
	    }
	    clear() {
	        for (var i = 0; i < this.slots.length; i++) {
	            this.pop(this.slots[i]);
	        }
	    }
	    destory() {
	        this.clear();
	        if (this.container)
	            this.container['remove'](this);
	    }
	}

	class plot3 {
	    static box(dst, origin, size, color) {
	        var gs = new GeometryStructure();
	        gs.ves.push(new float3(-0.5, -0.5, -0.5), new float3(+0.5, -0.5, -0.5), new float3(+0.5, +0.5, -0.5), new float3(-0.5, +0.5, -0.5), new float3(-0.5, -0.5, +0.5), new float3(+0.5, -0.5, +0.5), new float3(+0.5, +0.5, +0.5), new float3(-0.5, +0.5, +0.5));
	        var i;
	        for (i = 0; i < gs.ves.length; i++) {
	            gs.ves[i].scaleBy(size);
	        }
	        //     7------6
	        //   4------5 |     
	        //   | |    | |    z  y
	        //   | 3----+ 2    | /
	        //   0------1/      -- x
	        var surf0, surf1;
	        //z
	        surf0 = new GeometrySurface();
	        surf1 = new GeometrySurface();
	        surf0.indices.push(0, 3, 2, 1);
	        surf1.indices.push(4, 5, 6, 7);
	        surf0.sections.push(0, 4);
	        surf1.sections.push(0, 4);
	        surf0.normal = new float3(0, 0, -1);
	        surf1.normal = new float3(0, 0, +1);
	        gs.surfaces.push(surf0);
	        gs.surfaces.push(surf1);
	        //x
	        surf0 = new GeometrySurface();
	        surf1 = new GeometrySurface();
	        surf0.indices.push(0, 1, 5, 4);
	        surf1.indices.push(2, 3, 7, 6);
	        surf0.sections.push(0, 4);
	        surf1.sections.push(0, 4);
	        surf0.normal = new float3(0, -1, 0);
	        surf1.normal = new float3(0, +1, 0);
	        gs.surfaces.push(surf0);
	        gs.surfaces.push(surf1);
	        //y
	        surf0 = new GeometrySurface();
	        surf1 = new GeometrySurface();
	        surf0.indices.push(3, 0, 4, 7);
	        surf1.indices.push(1, 2, 6, 5);
	        surf0.sections.push(0, 4);
	        surf1.sections.push(0, 4);
	        surf0.normal = new float3(-1, 0, 0);
	        surf1.normal = new float3(+1, 0, 0);
	        gs.surfaces.push(surf0);
	        gs.surfaces.push(surf1);
	        var buffer = VolumeTool.GeometryStructure2Buffer(gs);
	        var labmertMat = new THREE.MeshLambertMaterial();
	        labmertMat.color = new THREE.Color(color);
	        var mesh = new THREE.Mesh(buffer, labmertMat);
	        mesh.receiveShadow = true;
	        mesh.castShadow = true;
	        mesh.position.set(origin.x, origin.y, origin.z);
	        dst.add(mesh);
	    }
	    static cycle(dst, origin, up, range, material) {
	        var dAngle = 20;
	        var v = new float3(1, 1, 1);
	        v = v.cancel(up);
	        v = v.normal();
	        v = v.scale(range);
	        var mat = tensor3.eular(up.scale(dAngle * CalcConst.DEGREES_TO_RADIANS));
	        var point;
	        var geometry = new THREE.Geometry();
	        for (var i = 0; i <= 360; i += dAngle) {
	            v = mat.mulvector(v);
	            point = origin.add(v);
	            geometry.vertices.push(converthreejs.float3vector3(point));
	        }
	        var line = new THREE.Line(geometry, material);
	        dst.add(line);
	    }
	    static path(dst, ves, material) {
	        var geometry = new THREE.Geometry();
	        for (var i = 0; i < ves.length; i++) {
	            geometry.vertices.push(converthreejs.float3vector3(ves[i]));
	        }
	        var line = new THREE.Line(geometry, material);
	        dst.add(line);
	    }
	    static loop(dst, ves, material) {
	        if (ves.length < 2)
	            return;
	        var geometry = new THREE.Geometry();
	        for (var i = 0; i < ves.length; i++) {
	            geometry.vertices.push(converthreejs.float3vector3(ves[i]));
	        }
	        geometry.vertices.push(converthreejs.float3vector3(ves[0]));
	        var line = new THREE.Line(geometry, material);
	        dst.add(line);
	    }
	    static complexloop(dst, ves, sections, material0, material1) {
	        var geometry = new THREE.Geometry();
	        for (var j = 0; j < sections.length - 1; j++) {
	            var s0 = sections[j];
	            var slen = sections[j + 1] - s0;
	            for (var i = 0; i < slen; i++) {
	                geometry.vertices.push(converthreejs.float3vector3(ves[i + s0]));
	            }
	            geometry.vertices.push(converthreejs.float3vector3(ves[0 + s0]));
	            var line = new THREE.Line(geometry, (j == 0) ? material0 : material1);
	            dst.add(line);
	        }
	    }
	    static line(dst, a, b, material) {
	        var geometry = new THREE.Geometry();
	        geometry.vertices.push(converthreejs.float3vector3(a));
	        geometry.vertices.push(converthreejs.float3vector3(b));
	        var line = new THREE.Line(geometry, material);
	        dst.add(line);
	    }
	    /**
	     * linecap  : 'butt', 'round' and 'square'
	     * linejoin : 'round', 'bevel' and 'miter'
	     */
	    static linematerial(color = 0xffffff, size = 1, cap = 'round', join = 'round') {
	        return new THREE.LineBasicMaterial({
	            'color': color,
	            'linewidth': size,
	            'linecap': cap,
	            'linejoin': join //ignored by WebGLRenderer
	        });
	    }
	    static dashlinematerial(color, size = 1, scale = 1, dash = 3, gap = 1) {
	        return new THREE.LineDashedMaterial({
	            'color': color,
	            'linewidth': size,
	            'scale': scale,
	            'dashSize': dash,
	            'gapSize': gap,
	        });
	    }
	}

	//https://www.sarasoueidan.com/demos/interactive-svg-coordinate-system/
	class plotsvg {
	    static create(dst) {
	        return dst.g();
	    }
	    static slots(dst) {
	        return dst.children();
	    }
	    static slot(dst, index) {
	        return dst.children()[index];
	    }
	    static slotsize(dst) {
	        return dst.children().length;
	    }
	    static clear(dst) {
	        var list = dst.children();
	        for (var i = 0; i < list.length; i++) {
	            list[i].remove();
	        }
	    }
	    static destroy(dst) {
	        dst.remove();
	    }
	    static edgestructure(dst, es, strokecolor = 0x60544F, strokesize = 1) {
	        var i;
	        for (i = 0; i < es.egs.length; i++) {
	            var eg = es.egs[i];
	            plotsvg.line(dst, es.ves[eg.v], es.ves[eg.w], strokecolor, strokesize);
	        }
	    }
	    static mesh(dst, meshdata, projectmatrix, viewmatrix, eyeray, sundir, color, strokesize) {
	        var i;
	        var i = 0;
	        var pvmatrix = projectmatrix.mulmatrix(viewmatrix);
	        var zero = viewmatrix.mulvector(new float3());
	        var viewmatrixR = viewmatrix.clone();
	        viewmatrixR.translate(zero.negate());
	        var vesdisq = [];
	        var vessort = [];
	        var vesorder = [];
	        var idx0, idx1, idx2;
	        var v0, v1, v2;
	        for (i = 0; i < meshdata.ves.length; i++) {
	            v0 = meshdata.ves[i];
	            if (v0.normal.dot(eyeray.dir) < 1 - CalcConst.dot_err) {
	                vesdisq.push(-v0.pos.sub(eyeray.pos).dot(eyeray.dir) + CalcConst.dis_err);
	            }
	            else {
	                vesdisq.push(-v0.pos.sub(eyeray.pos).dot(eyeray.dir));
	            }
	        }
	        vessort = lstool.sortindices(vesdisq);
	        vesorder = [];
	        vessort.length = vessort.length;
	        for (i = 0; i < vessort.length; i++) {
	            vesorder[vessort[i]] = i;
	        }
	        var shadowshift = sundir.scale(8);
	        var trianglessort = [];
	        for (i = 0; i < meshdata.triangles.length; i += 3) {
	            idx0 = meshdata.triangles[i + 0];
	            idx1 = meshdata.triangles[i + 1];
	            idx2 = meshdata.triangles[i + 2];
	            trianglessort.push(Math.min(vesorder[idx0], vesorder[idx1], vesorder[idx2]));
	        }
	        var trianglesorders = lstool.sortindices(trianglessort);
	        for (i = 0; i < trianglesorders.length; i++) {
	            var ii = trianglesorders[i] * 3;
	            idx0 = meshdata.triangles[ii + 0];
	            idx1 = meshdata.triangles[ii + 1];
	            idx2 = meshdata.triangles[ii + 2];
	            v0 = meshdata.ves[idx0];
	            v1 = meshdata.ves[idx1];
	            v2 = meshdata.ves[idx2];
	            if (v0.normal.dot(eyeray.dir) > 1 - CalcConst.dot_err) {
	                plotsvg.triangle(dst, pvmatrix.mulvector(v2.pos.add(shadowshift)), pvmatrix.mulvector(v1.pos.add(shadowshift)), pvmatrix.mulvector(v0.pos.add(shadowshift)), 0x66000000, strokesize);
	                continue;
	            }
	            if (v0.normal.dot(eyeray.dir) > 0 - CalcConst.dot_err)
	                continue;
	            var diffusedot = -viewmatrixR.mulvector(v0.normal).dot(sundir);
	            var diffuse = ColorHelper.scalecolor(color, MathCalc.Clamp(diffusedot, 0, 1));
	            plotsvg.triangle(dst, pvmatrix.mulvector(v0.pos), pvmatrix.mulvector(v1.pos), pvmatrix.mulvector(v2.pos), diffuse, strokesize);
	        }
	    }
	    static line(dst, a, b, strokecolor = 0x60544F, strokesize = 1) {
	        var el = dst.line(a.x, a.y, b.x, b.y);
	        plotsvg.attrclear(el);
	        plotsvg.attrstoke(el, strokecolor, strokesize);
	        return el;
	    }
	    static dashline(dst, a, b, strokecolor = 0x60544F, strokesize = 1, dashinterval = 5) {
	        var ab = b.sub(a);
	        var dir = ab.normal();
	        var len = ab.dot(dir);
	        var g = dst.g();
	        g.attr({ name: 'dashline' });
	        var el;
	        for (var i = 0; i < len; i += dashinterval * 2) {
	            if (i + dashinterval > len) {
	                el = plotsvg.line(g, a.advance(dir, i), b, strokecolor, strokesize);
	                plotsvg.attrstoke(el, strokecolor, strokesize);
	            }
	            else {
	                el = plotsvg.line(g, a.advance(dir, i), a.advance(dir, i + dashinterval), strokecolor, strokesize);
	                plotsvg.attrstoke(el, strokecolor, strokesize);
	            }
	        }
	        return g;
	    }
	    static dashpath(dst, ves, strokecolor = 0x60544F, strokesize = 1, dashinterval = 5) {
	        var g = dst.g();
	        g.attr({ name: 'dashloop' });
	        var el;
	        var head = ves[0];
	        var next = ves[0];
	        var pass = 0;
	        var tick = true;
	        for (var i = 0; i < ves.length - 1; i++) {
	            var a = ves[i];
	            var b = ves[i + 1];
	            var ab = b.sub(a);
	            var dir = ab.normal();
	            var len = ab.dot(dir);
	            while (len > 0) {
	                var plus = Math.min(dashinterval - pass, len);
	                pass += plus;
	                len -= plus;
	                next = head.advance(dir, plus);
	                if (tick) {
	                    el = plotsvg.line(g, head, next, strokecolor, strokesize);
	                    plotsvg.attrstoke(el, strokecolor, strokesize);
	                }
	                head = next;
	                if (pass >= dashinterval) {
	                    pass = pass % dashinterval;
	                    tick = !tick;
	                }
	            }
	        }
	        return g;
	    }
	    static path(dst, ves, strokecolor = 0x60544F, strokesize = 1) {
	        if (ves.length < 2)
	            return;
	        var i;
	        var u = ves[0];
	        var comm = "";
	        comm += "M" + u.x + ',' + u.y;
	        for (i = 1; i < ves.length; i++) {
	            u = ves[i];
	            comm += "L" + u.x + ',' + u.y;
	        }
	        var el = dst.path(comm);
	        plotsvg.attrclear(el);
	        plotsvg.attrstoke(el, strokecolor, strokesize);
	        return el;
	    }
	    static dashloop(dst, ves, strokecolor = 0x60544F, strokesize = 1, dashinterval = 5) {
	        var g = dst.g();
	        g.attr({ name: 'dashloop' });
	        var el;
	        var head = ves[0];
	        var next = ves[0];
	        var pass = 0;
	        var tick = true;
	        for (var i = 0; i < ves.length; i++) {
	            var a = ves[i];
	            var b = ves[(i + 1) % ves.length];
	            var ab = b.sub(a);
	            var dir = ab.normal();
	            var len = ab.dot(dir);
	            while (len > 0) {
	                var plus = Math.min(dashinterval - pass, len);
	                pass += plus;
	                len -= plus;
	                next = head.advance(dir, plus);
	                if (tick) {
	                    el = plotsvg.line(g, head, next, strokecolor, strokesize);
	                    plotsvg.attrstoke(el, strokecolor, strokesize);
	                }
	                head = next;
	                if (pass >= dashinterval) {
	                    pass = pass % dashinterval;
	                    tick = !tick;
	                }
	            }
	        }
	        return g;
	    }
	    static loop(dst, ves, strokecolor = 0x60544F, strokesize = 1) {
	        if (ves.length < 2)
	            return;
	        var i;
	        var u = ves[0];
	        var comm = "";
	        comm += "M" + u.x + ',' + u.y;
	        for (i = 1; i < ves.length; i++) {
	            u = ves[i];
	            comm += "L" + u.x + ',' + u.y;
	        }
	        u = ves[0];
	        comm += "L" + u.x + ',' + u.y;
	        var el = dst.path(comm);
	        plotsvg.attrclear(el);
	        plotsvg.attrstoke(el, strokecolor, strokesize);
	        return el;
	    }
	    static complexloop(dst, ves, sections, strokecolor = 0xf4eee6, strokesize = 1) {
	        var i, j;
	        var g = dst.g();
	        g.attr({ name: 'complexloop' });
	        for (j = 0; j < sections.length - 1; j++) {
	            var s0 = sections[j];
	            var slen = sections[j + 1] - s0;
	            var comm = "";
	            var u = ves[s0];
	            comm += "M" + u.x + ',' + u.y;
	            for (i = 1; i < slen; i++) {
	                u = ves[i + s0];
	                comm += "L" + u.x + ',' + u.y;
	            }
	            u = ves[s0];
	            comm += "L" + u.x + ',' + u.y;
	            var el = g.path(comm);
	            plotsvg.attrclear(el);
	            plotsvg.attrstoke(el, strokecolor, strokesize);
	        }
	        return g;
	    }
	    static triangle(dst, u, v, w, color = 0xCCC1BC, strokesize = 1) {
	        var el = dst.polygon([u.x, u.y, v.x, v.y, w.x, w.y, u.x, u.y]);
	        plotsvg.attrstoke(el, color, strokesize);
	        plotsvg.attrfill(el, color);
	        return el;
	    }
	    static surface(dst, ves, ids, color = 0xCCC1BC, strokesize = 1) {
	        var i;
	        for (i = 0; i < ids.length - 2; i += 3) {
	            var u = ves[ids[i + 0]];
	            var v = ves[ids[i + 1]];
	            var w = ves[ids[i + 2]];
	            var el = dst.polygon([u.x, u.y, v.x, v.y, w.x, w.y]);
	            plotsvg.attrstoke(el, color, strokesize);
	            plotsvg.attrfill(el, color);
	        }
	    }
	    static cycle(dst, origin, range, strokecolor = 0x60544F, strokesize = 1) {
	        var points = new Array();
	        var dAngle = 20;
	        var v = new float3(1, 1, 1);
	        var up = new float3(0, 0, 1);
	        v = v.cancel(up);
	        v = v.normal();
	        v = v.scale(range);
	        var mat = tensor3.eular(up.scale(dAngle * CalcConst.DEGREES_TO_RADIANS));
	        for (var i = 0; i <= 360; i += dAngle) {
	            v = mat.mulvector(v);
	            points.push(origin.add(v));
	        }
	        return plotsvg.path(dst, points, strokecolor, strokesize);
	    }
	    static text(dst, text, pos, color = 0x000000, fontsize = 8, fontweight = 500) {
	        var el = dst.text(pos.x, pos.y, text);
	        el.attr({
	            'fill': "#" + ColorHelper.RGBstr(color),
	            'fill-opacity': ColorHelper.alpha(color),
	            'font-size': fontsize,
	            'cursor': 'default',
	            'font-weight': fontweight,
	        });
	        return el;
	    }
	    static attrstoke(dst, strokecolor, strokesize) {
	        var attr = {};
	        attr['strokeWidth'] = strokesize;
	        attr['stroke'] = "#" + ColorHelper.RGBstr(strokecolor);
	        attr['stroke-opacity'] = ColorHelper.alpha(strokecolor);
	        dst.attr(attr);
	    }
	    static attrfill(dst, fillcolor) {
	        var attr = {};
	        attr['fill'] = "#" + ColorHelper.RGBstr(fillcolor);
	        attr['opacity'] = ColorHelper.alpha(fillcolor);
	        dst.attr(attr);
	    }
	    static attrclear(dst) {
	        var attr = {};
	        attr['fill-opacity'] = 0;
	        attr['stroke-opacity'] = 0;
	        dst.attr(attr);
	    }
	}

	class ViewerTHREE {
	    constructor() {
	    }
	    add(value) {
	        this.scene.add(value);
	    }
	    checkWebGL() {
	        var res = true;
	        try {
	            var canvas = document.createElement('canvas');
	            var gl = canvas.getContext('webgl');
	            res = gl instanceof WebGLRenderingContext;
	        }
	        catch (e) {
	            res = false;
	        }
	        return res;
	    }
	    showerror() {
	        var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';
	        var element = document.createElement('div');
	        element.id = 'webglmessage';
	        element.style.fontFamily = 'monospace';
	        element.style.fontSize = '13px';
	        element.style.fontWeight = 'normal';
	        element.style.textAlign = 'center';
	        element.style.background = '#fff';
	        element.style.color = '#000';
	        element.style.padding = '1.5em';
	        element.style.width = '400px';
	        element.style.margin = '5em auto 0';
	        message = message.replace('$0', 'device');
	        message = message.replace('$1', 'WebGL');
	        element.innerHTML = message;
	        document.body.appendChild(element);
	    }
	    init(container = null) {
	        var enableGL = this.checkWebGL();
	        if (!enableGL)
	            this.showerror();
	        this.initGraphics(container);
	    }
	    initGraphics(container) {
	        this.viewcontainer = document.createElement('div');
	        this.viewcontainer.id = 'threejs';
	        if (container)
	            container.appendChild(this.viewcontainer);
	        else
	            document.body.appendChild(this.viewcontainer);
	        this.scene = new THREE.Scene();
	        this.scene.background = new THREE.Color(0xbfd1e5);
	        this.renderer = new THREE.WebGLRenderer();
	        this.renderer.setPixelRatio(window.innerWidth / window.innerHeight);
	        this.renderer.setSize(window.innerWidth, window.innerHeight);
	        this.renderer.shadowMap.enabled = true;
	        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	        this.viewcontainer.appendChild(this.renderer.domElement);
	        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	        this.camera.position.set(0, -500, 100);
	        this.camera.up.set(0, 0, 1);
	        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	        this.ambientLight = new THREE.AmbientLight(0x404040);
	        this.scene.add(this.ambientLight);
	        this.light = new THREE.DirectionalLight(0xffffff, 1);
	        this.light.position.set(-60, 10, 60);
	        this.light.lookAt(0, 0, 0);
	        this.light.castShadow = true;
	        var d = 512;
	        this.light.shadow.camera["left"] = -d;
	        this.light.shadow.camera["right"] = d;
	        this.light.shadow.camera["top"] = d;
	        this.light.shadow.camera["bottom"] = -d;
	        this.light.shadow.camera.near = 1;
	        this.light.shadow.camera.far = 500;
	        this.light.shadow.mapSize.x = 1024;
	        this.light.shadow.mapSize.y = 1024;
	        this.scene.add(this.light);
	        window.addEventListener('resize', this.onWindowResize.bind(this), false);
	    }
	    onWindowResize() {
	        if (this.camera instanceof THREE.PerspectiveCamera) {
	            this.camera.aspect = window.innerWidth / window.innerHeight;
	            this.camera.updateProjectionMatrix();
	        }
	        else if (this.camera instanceof THREE.OrthographicCamera) {
	            this.camera.left = -window.innerWidth / 2;
	            this.camera.right = +window.innerWidth / 2;
	            this.camera.top = +window.innerHeight / 2;
	            this.camera.bottom = -window.innerHeight / 2;
	            this.camera.updateProjectionMatrix();
	        }
	        this.renderer.setSize(window.innerWidth, window.innerHeight);
	    }
	    use_ground() {
	        var loader = new THREE.TextureLoader();
	        var groundTexture = loader.load('textures/grasslight-big.jpg');
	        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	        groundTexture.repeat.set(1, 1);
	        groundTexture.anisotropy = 16;
	        var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });
	        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000, 1000), groundMaterial);
	        mesh.position.z = 0;
	        //mesh.rotation.x = - Math.PI / 2;
	        mesh.receiveShadow = true;
	        this.scene.add(mesh);
	    }
	    render() {
	        this.renderer.render(this.scene, this.camera);
	    }
	}

	//https://www.sarasoueidan.com/demos/interactive-svg-coordinate-system/
	//https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
	class ViewerSVG {
	    constructor(container = null) {
	        this.size = new float3(800, 600);
	        this.use_fullscreen = false;
	        this.use_camera = false;
	        this.camera_offset = new float3();
	        this.camera_scale = 1;
	        this.useviewbox = true;
	        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	        this.svg.setAttribute("id", 'svgview');
	        this.update();
	        this.svg.style.display = "block";
	        this.svg.style.background = "rgb(200, 200, 200)";
	        //this.svg.style.top ="25%";
	        //this.svg.style.left = "25%";
	        this.svg.style.position = "absolute";
	        if (container == null)
	            document.body.appendChild(this.svg);
	        else
	            container.appendChild(this.svg);
	        this.snap = Snap("#svgview").g();
	        this.snap.attr({
	        //transform: "translate(0 " + this.size.y + ") scale(1 -1)"
	        });
	    }
	    // TODO : aspect
	    camera(offset, scale, aspect = 1) {
	        this.use_camera = true;
	        this.camera_offset = offset;
	        this.camera_scale = scale;
	        this.update();
	    }
	    update() {
	        if (this.use_fullscreen) {
	            this.size.x = document.body.clientWidth;
	            this.size.y = document.body.clientHeight;
	        }
	        this.svg.setAttribute("width", this.size.x.toString());
	        this.svg.setAttribute("height", this.size.y.toString());
	        if (this.use_camera) {
	            this.svg.setAttribute("viewBox", -this.camera_offset.x + " " + -this.camera_offset.y + " " + this.size.x / this.camera_scale + " " + this.size.y / this.camera_scale);
	        }
	        else {
	            this.svg.removeAttribute("viewBox");
	        }
	    }
	    welcome() {
	        var g = this.snap.g();
	        var ploy = g.polygon([10, 10, 10, 100, 100, 100, 100, 11]);
	        ploy.attr({ fill: "red", stroke: "blue" });
	        var block = g.rect(50, 50, 100, 100, 20, 20);
	        block.attr({
	            fill: "rgb(236, 240, 241)",
	            stroke: "#1f2c39",
	            strokeWidth: 3
	        });
	        var text = g.text(50, 135, "Hello!");
	        text.attr({
	            'font-size': 100
	        });
	        block.attr({
	            width: (text.node.clientWidth + 110)
	        });
	        g.remove();
	    }
	}

	exports.ArcCurvesPoly = ArcCurvesPoly;
	exports.ArcPoint3ToSegmentArray = ArcPoint3ToSegmentArray;
	exports.BezierCurves = BezierCurves;
	exports.BezierCurvesPoly = BezierCurvesPoly;
	exports.BoxBound = BoxBound;
	exports.CalcConst = CalcConst;
	exports.ColorHelper = ColorHelper;
	exports.Coordinate = Coordinate;
	exports.DataHistoryBackward = DataHistoryBackward;
	exports.DataHistoryForward = DataHistoryForward;
	exports.DataHistroy = DataHistroy;
	exports.DataLogCalculator = DataLogCalculator;
	exports.DirPoint = DirPoint;
	exports.Edge = Edge;
	exports.EdgeData = EdgeData;
	exports.EdgeHull = EdgeHull;
	exports.EdgeMolding = EdgeMolding;
	exports.EdgeShape = EdgeShape;
	exports.EdgeStructure = EdgeStructure;
	exports.EdgeStructureRayHit = EdgeStructureRayHit;
	exports.ExtrudeTool = ExtrudeTool;
	exports.GenEdge = GenEdge;
	exports.GenedgeDataSearchRes = GenedgeDataSearchRes;
	exports.GenedgeStructure = GenedgeStructure;
	exports.GeometryDataOutput = GeometryDataOutput;
	exports.GeometryModifier = GeometryModifier;
	exports.GeometryStructure = GeometryStructure;
	exports.GeometryStructureOutMeshData = GeometryStructureOutMeshData;
	exports.GeometryStructureRayCastResult = GeometryStructureRayCastResult;
	exports.GeometrySurface = GeometrySurface;
	exports.ItemLog = ItemLog;
	exports.KeyCodeHelper = KeyCodeHelper;
	exports.MathCalc = MathCalc;
	exports.MeshData = MeshData;
	exports.MeshDataOutTHREE = MeshDataOutTHREE;
	exports.ParamLog = ParamLog;
	exports.Poly = Poly;
	exports.PolyCollideRes = PolyCollideRes;
	exports.ProcessDeformationEdgeTracking = ProcessDeformationEdgeTracking;
	exports.ProcessDeformationShapeTracking = ProcessDeformationShapeTracking;
	exports.ProcessEdgeAndShapePacking = ProcessEdgeAndShapePacking;
	exports.ProcessFindContinueSegments = ProcessFindContinueSegments;
	exports.ProcessFindEdgeLoopMax = ProcessFindEdgeLoopMax;
	exports.ProcessFindEdgeLoopMin = ProcessFindEdgeLoopMin;
	exports.ProcessFormat = ProcessFormat;
	exports.ProcessSurfaceTriangleFill = ProcessSurfaceTriangleFill;
	exports.ProcessSurfaceTriangleFill_Edge = ProcessSurfaceTriangleFill_Edge;
	exports.Ray = Ray;
	exports.RouteVolume = RouteVolume;
	exports.Segment = Segment;
	exports.Shape = Shape;
	exports.ShapeOperationAdd = ShapeOperationAdd;
	exports.ShapeOperationExpand = ShapeOperationExpand;
	exports.ShapeRayHitRes = ShapeRayHitRes;
	exports.ShapeVolume = ShapeVolume;
	exports.StringHelper = StringHelper;
	exports.SupportEdgeClasses = SupportEdgeClasses;
	exports.VectorCalc = VectorCalc;
	exports.VectorLoopCalc = VectorLoopCalc;
	exports.VertexData = VertexData;
	exports.ViewerSVG = ViewerSVG;
	exports.ViewerTHREE = ViewerTHREE;
	exports.VolumeTool = VolumeTool;
	exports.alignableInterfaceTag = alignableInterfaceTag;
	exports.alignkit = alignkit;
	exports.bforgable = bforgable;
	exports.bfunc = bfunc;
	exports.biuupdatelevel = biuupdatelevel;
	exports.bobj = bobj;
	exports.bproperty = bproperty;
	exports.converthreejs = converthreejs;
	exports.f3 = f3;
	exports.f3box = f3box;
	exports.float2 = float2;
	exports.float3 = float3;
	exports.lstool = lstool;
	exports.object3 = object3;
	exports.object3tool = object3tool;
	exports.plot3 = plot3;
	exports.plotsvg = plotsvg;
	exports.tensor3 = tensor3;
	exports.tensor3t = tensor3t;
	exports.timer = timer;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
