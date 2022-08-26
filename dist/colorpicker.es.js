import { ref, reactive, onMounted, watch, nextTick, openBlock, createElementBlock, createElementVNode, normalizeStyle, createCommentVNode, withDirectives, withModifiers, Fragment, renderList, normalizeClass, toDisplayString, vShow, pushScopeId, popScopeId } from "vue";
let Utils = {
  hsb2rgb(hsb) {
    var rgb = {};
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s * 255 / 100);
    var v = Math.round(hsb.b * 255 / 100);
    if (s == 0) {
      rgb.r = rgb.g = rgb.b = v;
    } else {
      var t1 = v;
      var t2 = (255 - s) * v / 255;
      var t3 = (t1 - t2) * (h % 60) / 60;
      if (h == 360)
        h = 0;
      if (h < 60) {
        rgb.r = t1;
        rgb.b = t2;
        rgb.g = t2 + t3;
      } else if (h < 120) {
        rgb.g = t1;
        rgb.b = t2;
        rgb.r = t1 - t3;
      } else if (h < 180) {
        rgb.g = t1;
        rgb.r = t2;
        rgb.b = t2 + t3;
      } else if (h < 240) {
        rgb.b = t1;
        rgb.r = t2;
        rgb.g = t1 - t3;
      } else if (h < 300) {
        rgb.b = t1;
        rgb.g = t2;
        rgb.r = t2 + t3;
      } else if (h < 360) {
        rgb.r = t1;
        rgb.g = t2;
        rgb.b = t1 - t3;
      } else {
        rgb.r = 0;
        rgb.g = 0;
        rgb.b = 0;
      }
    }
    return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b), a: hsb.a };
  },
  hsba2rgba(hsba) {
    const c = this.hsb2rgb(hsba);
    return `rgba(${c.r},${c.g},${c.b},${c.a})`;
  },
  rgb2hex(rgb) {
    var hex = [rgb.r.toString(16), rgb.g.toString(16), rgb.b.toString(16)];
    hex.map(function(str, i) {
      if (str.length == 1) {
        hex[i] = "0" + str;
      }
    });
    return hex.join("");
  },
  hex2rgb(hex) {
    let h = parseInt(hex.indexOf("#") > -1 ? hex.substring(1) : hex, 16);
    return { r: h >> 16, g: (h & 65280) >> 8, b: h & 255 };
  },
  hex2hsb(hex) {
    const rgba = this.hex2rgb(hex);
    rgba.a = 1;
    return this.rgba2hsba(rgba);
  },
  rgba2hsba(rgba) {
    var hsba = { h: 0, s: 0, b: 0, a: rgba.a };
    var min = Math.min(rgba.r, rgba.g, rgba.b);
    var max = Math.max(rgba.r, rgba.g, rgba.b);
    var delta = max - min;
    hsba.b = max;
    hsba.s = max != 0 ? 255 * delta / max : 0;
    if (hsba.s != 0) {
      if (rgba.r == max)
        hsba.h = (rgba.g - rgba.b) / delta;
      else if (rgba.g == max)
        hsba.h = 2 + (rgba.b - rgba.r) / delta;
      else
        hsba.h = 4 + (rgba.r - rgba.g) / delta;
    } else
      hsba.h = -1;
    hsba.h *= 60;
    if (hsba.h < 0)
      hsba.h += 360;
    hsba.s *= 100 / 255;
    hsba.b *= 100 / 255;
    return hsba;
  }
};
var maskImgUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAAM0lEQVQ4EWM8cuTIfwY8wMbGhhGPNAMTPkli5EYNYBgEgYg3jkHRSCidjEbjYIhGimMBAKIWB2rXs92IAAAAAElFTkSuQmCC";
var ColorPicker_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => '.flex-row[data-v-3699d9f0]{display:flex;flex-direction:row;align-items:center}.flex-column[data-v-3699d9f0]{display:flex;flex-direction:column;align-items:center}.cbtn[data-v-3699d9f0]{border:1px solid #dcdfe6;background:#ffffff;border-radius:4px;width:40px;height:40px;padding:6px}.cbtn-inner[data-v-3699d9f0]{background:#dcdfe6;width:100%;height:100%}.panel[data-v-3699d9f0]{position:absolute;background:#fff;top:45px;left:0;width:240px;border:1px solid #dcdfe6;border-radius:6px;z-index:1000}.panel[data-v-3699d9f0]:before{content:"";display:block;position:absolute;top:-6px;left:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #dcdfe6}.panel[data-v-3699d9f0]:after{content:"";display:block;position:absolute;top:-5px;left:10px;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #ffffff}.activeMode-wrapper[data-v-3699d9f0]{border-bottom:1px solid #dcdfe6;height:40px;display:flex;flex-direction:row;align-items:center;padding-left:12px}.btn-activeMode[data-v-3699d9f0]{border:1px solid #ff7d3a;margin-right:12px;border-radius:50%;width:14px;height:14px;cursor:pointer}.btn-activeMode.solid[data-v-3699d9f0]{background:#ffc9b6}.btn-activeMode.solid.gray[data-v-3699d9f0]{border:1px solid #7d7d7d;background:#e2e2e2}.btn-activeMode.linear[data-v-3699d9f0]{background:linear-gradient(180deg,#ffc9b6,#ff5011)}.btn-activeMode.linear.gray[data-v-3699d9f0]{border:1px solid #7d7d7d;background:linear-gradient(180deg,#ffffff,#999999)}.btn-activeMode.radial[data-v-3699d9f0]{background-image:radial-gradient(circle,#ffc9b6,#ff5011)}.btn-activeMode.radial.gray[data-v-3699d9f0]{border:1px solid #7d7d7d;background:radial-gradient(circle,#ffffff,#999999)}.palette-wrapper[data-v-3699d9f0]{margin:10px;height:140px;position:relative;border:1px solid #dcdfe6;border-radius:4px}.palette[data-v-3699d9f0]{position:absolute;overflow:hidden;inset:0px;border-radius:4px;background:rgb(255,0,0)}.palette .white[data-v-3699d9f0]{position:absolute;inset:0px;background:linear-gradient(to right,#fff,rgba(255,255,255,0))}.palette .black[data-v-3699d9f0]{position:absolute;inset:0px;background:linear-gradient(to top,#000,rgba(0,0,0,0))}.picker[data-v-3699d9f0]{position:absolute;width:14px;height:14px;top:-4px;left:-4px}.picker[data-v-3699d9f0]:before{content:"";top:3px;left:3px;position:absolute;width:6px;height:6px;display:block;background:rgba(255,255,255,0);box-shadow:0 0 0 1px #979797,0 0 0 3px #fff,0 0 0 4px #979797;border-radius:50%;cursor:default}.picker.on[data-v-3699d9f0]:before{box-shadow:0 0 0 1px #979797,0 0 0 3px #f50,0 0 0 4px #979797}.dropper[data-v-3699d9f0]{width:25px;height:30px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAyCAYAAAATIfj2AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANKADAAQAAAABAAAAMgAAAADS/xijAAAEnklEQVRoBe2Yz0sVURTH73u+J/4WDX+kaIJmCGlKUrTqF4WbpD9Ac6H5A6KCiGwRBS6yVtnGH+DC2rU0F0KUtTSMRAPJDKmHpUiKPxea2vc7vivzHjPzrr6RnjAXxjtz59y553POueeepxBOcyzgWMCxgGOBA2QBVyTp2t3dnbi+vv4AOp336/U+ISGhpaqqalFVz4gB6ujoOLq1tfUGih/RK+9yuX56vd7LtbW1X/XjZvcRAeSHeQ8ls5KTk0VBQYGm78TEhFhYWBCA+g2o8ypQ/x1ID5OSkiKKi4tFVFSUBrS5uSlGRkbE/Pw8oX4i/IpDhZ9Hm7kPfzo7O/Px2dsIo5Povbg+ezye9rq6us9yOSsYyrjdblFSUiKGh4fpqdzl5WXur7tyvlHvNhoMdwyKNgJkBBa+gf4MrnJc17HhPwL0Ib8fCkbqQCgZghg7J8fNets9BIWbAfKYC2ZnZ4uMjAyGi5idnRU+n8+Dd4/a29vzAXgRIlnBYWamqOq4rUB6mKKiIpGZmbmjR1JSkqDyo6OjAlDVfKECs7GxIZgc/G1A3pj1toUcYE5LzwTDyMVTU1O1Tc8wUoWhAZjp0H4g07XIb5n1tnkIMEVcBJlIpKenm60nCFVWVibi4+N3spmRMD1DGGY4tF8I20tI20tGsvox2zwUFxf3mgsjE2mpFoD6dQLuGX4yNQe88D8YwJxrbGz8ZiQbPGYbUE1NzZ/o6OgLPARpVZ4fVlDBisjncGD4DdsPVtRjx5CeB5DFDnOf8BzhnlFp4cJwDbWVVLTxy/jLE9ZkWvyresoOGK5pOxDOmDZ45xr3SExMjDIU954/m1Gvt6p7hsL6tl006UfCuCcMpt8kTEVFhSgtLRWTk5NicXFRu5j9eMgaNcIzWfAAhkFOVFZWir6+vg9GslZjxl+3mmHyLhgmJydHk6TVe3t7xcrKinb2hNpTc3NzWkIB1F+cO6f0tZ/J0gHDtnjIDIYr0fJ5eXnKnoqNjRXcTzCEG1BueInHgXILew9ZwUgt+BuHIaS6p9LS0uTUMnmj2ocFpAIjFeE+QjrXHkOdU/CMnLY9QT4p9HsG2g0MqmzR39+vhRKSwotQh+/MzIymOuQ+KTAEiOwJaK8wWPk50nENf06bQU1PT4upqSlmw1XIPwvQVuFh10DhwDQ1Nd2iTjx8jaAIMzY2JtW+09DQ8F0+qPa7Stt2wOgV05dJrNJ5uLKhVLoPmFa9rOq9MpDdMFJBQq2trb3DcxbHEGrNCMsn8v1ueyWg/YKRyvb09BxaXV29As+MwTODcnwvfUgg/DOjFWn0nixnZAVgtJg+m+H9c7lnjGT3a8wSqKur6yx+0wzAci7WZpEOQyNZZjnAVMM7rvLy8gMBExIIAlqFqStFOCegRUKY6RWy9BAEv1B4fHxcP2fnPtJgqJglEFJoG64lAg0OBiafSIQhkGVSoAD+33YV++gVLm9hYaHgxR9hQ0NDWm0Gkf+SzaibUQsJxEl+qBeASpQfgedYEj/FIdgsxyKhVwKiooDKBRBrseO4fEjlL+vr6z/wndMcCzgWcCzgWMCxgGOBbQv8A9futsRv4eXoAAAAAElFTkSuQmCC) center center no-repeat;background-size:25px}.grad-wrapper[data-v-3699d9f0]{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin:10px 10px 0}.grad-wrapper .grad-bar[data-v-3699d9f0]{border:1px solid #aaaaaa;border-radius:8px;height:12px;width:150px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAAM0lEQVQ4EWM8cuTIfwY8wMbGhhGPNAMTPkli5EYNYBgEgYg3jkHRSCidjEbjYIhGimMBAKIWB2rXs92IAAAAAElFTkSuQmCC);background-size:auto 100%;display:absolute}.degree[data-v-3699d9f0]{border:1px solid #aaaaaa;border-radius:50%;width:20px;height:20px}.picker-deg[data-v-3699d9f0]{border:1px solid #aaaaaa;border-radius:5px;width:8px;height:8px;background:#cccccc}.huebar-wrapper[data-v-3699d9f0]{margin:10px;display:flex;flex-direction:row;justify-content:space-between;align-items:center}.huebar-wrapper .bar-wrapper[data-v-3699d9f0]{display:flex;flex-direction:column;justify-content:space-between;gap:5px}.huebar-wrapper .hue-bar[data-v-3699d9f0],.huebar-wrapper .opacity-bar[data-v-3699d9f0]{border:1px solid #aaaaaa;border-radius:8px;width:150px;height:12px}.huebar-wrapper .hue-bar[data-v-3699d9f0]{background:linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)}.huebar-wrapper .opacity-bar[data-v-3699d9f0]{background-image:linear-gradient(to right,rgba(255,255,255,0) 0%,rgb(255,255,255) 100%),url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAAM0lEQVQ4EWM8cuTIfwY8wMbGhhGPNAMTPkli5EYNYBgEgYg3jkHRSCidjEbjYIhGimMBAKIWB2rXs92IAAAAAElFTkSuQmCC);background-size:auto 100%}.preview-wrapper[data-v-3699d9f0]{width:30px;height:30px;border-radius:50%;border:1px solid #aaaaaa;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAAEAAAAAA0VXHyAAAAM0lEQVQ4EWM8cuTIfwY8wMbGhhGPNAMTPkli5EYNYBgEgYg3jkHRSCidjEbjYIhGimMBAKIWB2rXs92IAAAAAElFTkSuQmCC);background-size:50% 50%}.preview-color[data-v-3699d9f0]{width:28px;height:28px;border-radius:50%}\n')();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId = (n) => (pushScopeId("data-v-3699d9f0"), n = n(), popScopeId(), n);
const _hoisted_1 = { onselectstart: "return false" };
const _hoisted_2 = ["onContextmenu"];
const _hoisted_3 = { class: "activeMode-wrapper" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["onClick", "onMousedown"];
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { style: { "font-size": "10px", "width": "36px", "padding-left": "8px" } };
const _hoisted_8 = { class: "palette-wrapper" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "white" }, null, -1));
const _hoisted_11 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "black" }, null, -1));
const _hoisted_12 = { class: "huebar-wrapper" };
const _hoisted_13 = { class: "bar-wrapper" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = ["onClick"];
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "preview-wrapper" };
const __default__ = { name: "vue3-colorpicker" };
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  props: {
    mode: {
      type: String,
      required: false,
      default: "solid"
    },
    degree: {
      type: Number,
      required: false,
      default: 90
    },
    color: {
      type: Object,
      required: false,
      default() {
        return { r: 0, g: 0, b: 0, a: 1 };
      }
    },
    gradients: {
      type: Object,
      required: false,
      default() {
        return [
          { percent: 0, color: { r: 255, g: 255, b: 255, a: 1 } },
          { percent: 100, color: { r: 0, g: 0, b: 0, a: 1 } }
        ];
      }
    },
    supportedModes: {
      type: Array,
      required: false,
      default: () => ["solid", "linear", "radial"]
    },
    showOpacityPicker: {
      type: Boolean,
      required: false,
      default: true
    },
    showPanelOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["colorChanged"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const cbtnEl = ref(null);
    const panelEl = ref(null);
    const paletteEl = ref(null);
    const palettePickerEl = ref(null);
    const huePickerEl = ref(null);
    const opacityPickerEl = ref(null);
    const hueBarEl = ref(null);
    const opactiyBarEl = ref(null);
    const gradBarEl = ref(null);
    const degreeEl = ref(null);
    const degreePickerEl = ref(null);
    const isShowPanel = ref(false);
    const activeGradPickerIndex = ref(0);
    const previewColor = ref("");
    const previewBackground = ref("");
    const gradPreviewColor = ref("");
    const isDropperEnabled = ref(true);
    const paletteColor = reactive(Utils.rgba2hsba(props.color));
    const degree = ref(props.degree);
    const activeMode = ref(props.mode);
    let g = [];
    const gradColors = ref(g);
    props.gradients.forEach((item, index) => {
      g.push({ id: index, percent: item.percent, color: Utils.rgba2hsba(item.color) });
    });
    gradColors.value = g;
    if (g.length > 0) {
      gradColors.value[gradColors.value.length - 1].id;
    }
    let isDragging = false;
    let paletteWidth = 216;
    let paletteHeight = 138;
    let barWidth = 150;
    let gradMaxId = 0;
    let eyeDropper = null;
    if ("EyeDropper" in window) {
      eyeDropper = new EyeDropper();
    } else {
      isDropperEnabled.value = false;
      console.log("EyeDropper only supports Google Chrome version 95 and above");
    }
    onMounted(() => {
      changeMode(activeMode.value);
      updateGradColor();
      updatePreviews();
    });
    watch(paletteColor, () => {
      updateGradColor();
      updatePreviews();
    });
    watch(isShowPanel, () => {
      if (isShowPanel.value) {
        document.addEventListener("click", bindOutsideClick, true);
        document.addEventListener("keyup", bindKeyUp, false);
      } else {
        document.removeEventListener("click", bindOutsideClick, true);
        document.removeEventListener("keyup", bindKeyUp, false);
      }
    });
    function changeMode(mode) {
      activeMode.value = mode;
      if (activeMode.value !== "solid") {
        setGradPickerPos();
        setDegreeHanderPos();
        const c = gradColors.value[activeGradPickerIndex.value].color;
        paletteColor.h = c.h;
        paletteColor.s = c.s;
        paletteColor.b = c.b;
        paletteColor.a = c.a;
      }
      setPickerPos();
      updateGradColor();
      updatePreviews();
    }
    async function dropColor() {
      if (!eyeDropper) {
        console.log("EyeDropper only supports Chrome Version 95+");
        return false;
      }
      eyeDropper.open().then((result) => {
        const c = Utils.hex2hsb(result.sRGBHex);
        paletteColor.h = c.h;
        paletteColor.s = c.s;
        paletteColor.b = c.b;
        paletteColor.a = c.a;
        setPickerPos();
      }).catch((error) => {
        console.log(error);
      });
    }
    function bindContext() {
      return false;
    }
    function bindKeyUp() {
      var _a, _b, _c;
      if (((_a = window == null ? void 0 : window.event) == null ? void 0 : _a.keyCode) == 27) {
        isShowPanel.value = false;
      } else if (((_b = window == null ? void 0 : window.event) == null ? void 0 : _b.keyCode) == 32 || ((_c = window == null ? void 0 : window.event) == null ? void 0 : _c.keyCode) == 8) {
        delGradPicker();
      }
    }
    function getElPos(el) {
      let Box = el.getBoundingClientRect(), doc = el.ownerDocument, body = doc.body, html = doc.documentElement, clientTop = html.clientTop || body.clientTop || 0, clientLeft = html.clientLeft || body.clientLeft || 0, top = Box.top + (self.pageYOffset || html.scrollTop || body.scrollTop) - clientTop, left = Box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft;
      return { top, left };
    }
    function getMousePos() {
      let x = 0, y = 0;
      let e = window.event;
      if (e.pageX) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x = e.clientX + document.body.scrollLeft - document.body.clientLeft;
        y = e.clientY + document.body.scrollTop - document.body.clientTop;
      }
      return { x, y };
    }
    function bindOutsideClick() {
      if (isDragging) {
        isDragging = false;
        return false;
      }
      if (!isInObject(panelEl.value) && !isInObject(cbtnEl.value)) {
        isShowPanel.value = false;
      }
      function isInObject(el) {
        const elPos = getElPos(el);
        const mousePos = getMousePos();
        if (mousePos.x > elPos.left + el.offsetWidth || mousePos.x < elPos.left || mousePos.y > elPos.top + el.offsetHeight || mousePos.y < elPos.top) {
          return false;
        } else {
          return true;
        }
      }
    }
    function bindDown(el, fnMove, index) {
      document.addEventListener("mousemove", bindMove, false);
      document.addEventListener("mouseup", bindUp, false);
      function bindMove() {
        isDragging = true;
        fnMove(el, index);
      }
      function bindUp() {
        document.removeEventListener("mousemove", bindMove);
        document.removeEventListener("mouseup", bindUp);
      }
    }
    function addGradPicker() {
      if (gradColors.value.length < 10) {
        const c = JSON.parse(JSON.stringify(gradColors.value[activeGradPickerIndex.value]));
        c.id = gradMaxId++;
        gradColors.value.push(c);
        activeGradPickerIndex.value = gradColors.value.length - 1;
        nextTick(() => getGradPickerPos(gradBarEl.value.children[activeGradPickerIndex.value], activeGradPickerIndex.value));
      }
    }
    function delGradPicker() {
      if (gradColors.value.length > 2) {
        gradColors.value.splice(activeGradPickerIndex.value, 1);
        activeGradPickerIndex.value = gradColors.value.length - 1;
        nextTick(() => updatePreviews());
      }
    }
    function getGradPickerPos(el, index) {
      const elPos = getElPos(gradBarEl.value);
      const mousePos = getMousePos();
      let left = Math.max(-3, Math.min(barWidth - 12, mousePos.x - elPos.left - 6));
      el.style.left = left + "px";
      gradColors.value[index].percent = (left + 3) / (barWidth - 9) * 100;
      activeGradPickerIndex.value = index;
      const c = gradColors.value[index].color;
      paletteColor.h = c.h;
      paletteColor.s = c.s;
      paletteColor.b = c.b;
      paletteColor.a = c.a;
      setPickerPos();
      updateGradColor();
      updatePreviews();
    }
    function setGradPickerPos() {
      gradColors.value.forEach((item, index) => {
        gradBarEl.value.children[index].style.left = (barWidth - 9) / 100 * item.percent - 3 + "px";
      });
    }
    function updateGradColor() {
      if (activeMode.value !== "solid") {
        gradColors.value[activeGradPickerIndex.value].color.a = paletteColor.a;
        gradColors.value[activeGradPickerIndex.value].color.h = paletteColor.h;
        gradColors.value[activeGradPickerIndex.value].color.s = paletteColor.s;
        gradColors.value[activeGradPickerIndex.value].color.b = paletteColor.b;
      }
    }
    function updatePreviews() {
      const c1 = Utils.hsb2rgb(paletteColor);
      previewColor.value = `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${c1.a})`;
      previewBackground.value = previewColor.value;
      let gradStr = "";
      let gradStyleStr = "";
      let g2 = [...gradColors.value];
      let gradArr = [];
      g2.sort((a, b) => {
        return a.percent - b.percent;
      });
      g2.forEach((item) => {
        gradStr += "," + Utils.hsba2rgba(item.color) + " " + item.percent + "%";
        gradArr.push({ percent: item.percent, color: Utils.hsb2rgb(item.color) });
      });
      const emitVal = {};
      emitVal.mode = activeMode.value;
      switch (activeMode.value) {
        case "solid":
          emitVal.color = Utils.hsb2rgb(paletteColor);
          emitVal.css = `background-color:${Utils.hsba2rgba(paletteColor)}`;
          break;
        case "linear":
          gradPreviewColor.value = `linear-gradient(to right,${gradStr.slice(1)}),url('${maskImgUrl}')`;
          previewBackground.value = `linear-gradient(${degree.value}deg${gradStr}),url('${maskImgUrl}')`;
          gradStyleStr = `background-image:linear-gradient(${degree.value}deg${gradStr})`;
          emitVal.degree = degree.value;
          emitVal.color = gradArr;
          emitVal.css = gradStyleStr;
          break;
        case "radial":
          gradPreviewColor.value = `linear-gradient(to right,${gradStr.slice(1)}),url('${maskImgUrl}')`;
          previewBackground.value = `radial-gradient(${gradStr.slice(1)}),url('${maskImgUrl}')`;
          gradStyleStr = `background-image:radial-gradient(${gradStr.slice(1)})`;
          emitVal.color = gradArr;
          emitVal.css = gradStyleStr;
          break;
      }
      emit("colorChanged", emitVal);
    }
    function getDegreePickerPos() {
      const r = 10;
      const bar_r = 4;
      const elPos = getElPos(degreeEl.value);
      const mousePos = getMousePos();
      const rad = Math.atan2(elPos.top + r - mousePos.y, mousePos.x - elPos.left - r);
      degreePickerEl.value.style.left = Math.cos(rad) * r + bar_r + 1 + "px";
      degreePickerEl.value.style.top = -Math.sin(rad) * r + bar_r + 1 + "px";
      let deg = 90 - Math.floor(rad * 180 / Math.PI);
      if (deg < 0) {
        deg += 360;
      }
      degree.value = deg;
      updateGradColor();
      updatePreviews();
    }
    function setDegreeHanderPos() {
      const r = 10;
      const bar_r = 4;
      let deg = degree.value;
      if (deg - 360 < 0) {
        deg -= 360;
      }
      const rad = -(deg - 90) * (Math.PI / 180);
      degreePickerEl.value.style.left = Math.cos(rad) * r + bar_r + 1 + "px";
      degreePickerEl.value.style.top = -Math.sin(rad) * r + bar_r + 1 + "px";
    }
    function getPalettePickerPos() {
      const elPos = getElPos(paletteEl.value);
      const mousePos = getMousePos();
      const left = Math.max(-6, Math.min(mousePos.x - elPos.left - 6, paletteWidth - 6));
      const top = Math.max(-6, Math.min(mousePos.y - elPos.top - 6, paletteHeight - 6));
      palettePickerEl.value.style.left = left + "px";
      palettePickerEl.value.style.top = top + "px";
      paletteColor.s = 100 * (left + 6) / paletteWidth;
      paletteColor.b = 100 * (paletteHeight - top - 6) / paletteHeight;
    }
    function getHuePickerPos() {
      const elPos = getElPos(hueBarEl.value);
      const mousePos = getMousePos();
      const left = Math.max(-3, Math.min(mousePos.x - elPos.left - 6, barWidth - 12));
      huePickerEl.value.style.left = left + "px";
      paletteColor.h = 360 * (left + 3) / (barWidth - 9);
      const c = Utils.hsb2rgb({ h: paletteColor.h, s: 100, b: 100, a: paletteColor.a });
      paletteEl.value.style.background = `rgb(${c.r},${c.g},${c.b},1)`;
    }
    function getOpacityPickerPos() {
      const elPos = getElPos(opactiyBarEl.value);
      const mousePos = getMousePos();
      const left = Math.max(-3, Math.min(barWidth - 12, mousePos.x - elPos.left - 6));
      opacityPickerEl.value.style.left = left + "px";
      paletteColor.a = (left + 3) / (barWidth - 9);
    }
    function setPickerPos() {
      const c = Utils.hsb2rgb({ h: paletteColor.h, s: 100, b: 100, a: paletteColor.a });
      paletteEl.value.style.background = `rgb(${c.r},${c.g},${c.b},1)`;
      palettePickerEl.value.style.left = paletteWidth / 100 * paletteColor.s - 6 + "px";
      palettePickerEl.value.style.top = paletteHeight - paletteHeight / 100 * paletteColor.b - 6 + "px";
      huePickerEl.value.style.left = (barWidth - 9) / 360 * paletteColor.h - 3 + "px";
      if (props.showOpacityPicker.value) {
        opacityPickerEl.value.style.left = (barWidth - 9) * paletteColor.a - 3 + "px";
      }
    }
    function togglePanel() {
      isShowPanel.value = !isShowPanel.value;
    }
    function openPanel() {
      isShowPanel.value = true;
    }
    function closePanel() {
      isShowPanel.value = false;
    }
    expose({
      openPanel,
      closePanel,
      togglePanel
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        !__props.showPanelOnly ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "cbtn",
          onClick: togglePanel,
          ref_key: "cbtnEl",
          ref: cbtnEl
        }, [
          createElementVNode("div", {
            class: "cbtn-inner",
            style: normalizeStyle({ background: previewBackground.value })
          }, null, 4)
        ], 512)) : createCommentVNode("", true),
        withDirectives(createElementVNode("div", {
          class: "panel",
          ref_key: "panelEl",
          ref: panelEl,
          onContextmenu: withModifiers(bindContext, ["prevent"])
        }, [
          createElementVNode("div", _hoisted_3, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.supportedModes, (mode) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["btn-activeMode", [mode, { gray: activeMode.value !== mode }]]),
                onClick: withModifiers(($event) => changeMode(mode), ["stop"])
              }, null, 10, _hoisted_4);
            }), 256))
          ]),
          createElementVNode("div", {
            class: "grad-wrapper",
            style: normalizeStyle(activeMode.value === "solid" ? "display:none" : "")
          }, [
            createElementVNode("div", {
              class: "grad-bar",
              ref_key: "gradBarEl",
              ref: gradBarEl,
              style: normalizeStyle({ backgroundImage: gradPreviewColor.value }),
              onClick: _cache[0] || (_cache[0] = withModifiers(($event) => addGradPicker(), ["stop"]))
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(gradColors.value, (item, index) => {
                return openBlock(), createElementBlock("div", {
                  key: item.id,
                  style: { "top": "-1px" },
                  class: normalizeClass(["picker", index == activeGradPickerIndex.value ? "on" : ""]),
                  onClick: withModifiers(($event) => getGradPickerPos($event.target, index), ["stop"]),
                  onMousedown: withModifiers(($event) => bindDown($event.target, getGradPickerPos, index), ["stop"])
                }, null, 42, _hoisted_5);
              }), 128))
            ], 4),
            createElementVNode("div", {
              class: "flex-row",
              style: normalizeStyle(activeMode.value === "linear" ? "" : "visibility:hidden")
            }, [
              createElementVNode("div", {
                class: "degree",
                ref_key: "degreeEl",
                ref: degreeEl,
                onClick: withModifiers(getDegreePickerPos, ["stop"]),
                onMousedown: _cache[2] || (_cache[2] = withModifiers(($event) => bindDown($event, getDegreePickerPos), ["stop"]))
              }, [
                createElementVNode("div", {
                  class: "picker-deg",
                  ref_key: "degreePickerEl",
                  ref: degreePickerEl,
                  onMousedown: _cache[1] || (_cache[1] = withModifiers(($event) => bindDown($event, getDegreePickerPos), ["stop"]))
                }, null, 544)
              ], 40, _hoisted_6),
              createElementVNode("div", _hoisted_7, toDisplayString(degree.value) + "\xB0", 1)
            ], 4)
          ], 4),
          createElementVNode("div", _hoisted_8, [
            createElementVNode("div", {
              class: "palette",
              ref_key: "paletteEl",
              ref: paletteEl,
              onClick: withModifiers(getPalettePickerPos, ["stop"]),
              onMousedown: _cache[4] || (_cache[4] = withModifiers(($event) => bindDown($event, getPalettePickerPos), ["stop"]))
            }, [
              _hoisted_10,
              _hoisted_11,
              createElementVNode("div", {
                class: "picker",
                ref_key: "palettePickerEl",
                ref: palettePickerEl,
                onMousedown: _cache[3] || (_cache[3] = withModifiers(($event) => bindDown($event, getPalettePickerPos), ["stop"]))
              }, null, 544)
            ], 40, _hoisted_9)
          ]),
          createElementVNode("div", _hoisted_12, [
            createElementVNode("div", {
              class: "dropper",
              onClick: dropColor,
              style: normalizeStyle([{ "cursor": "pointer" }, isDropperEnabled.value ? "" : "opacity: 50%;cursor:default"])
            }, null, 4),
            createElementVNode("div", _hoisted_13, [
              createElementVNode("div", {
                class: "hue-bar",
                ref_key: "hueBarEl",
                ref: hueBarEl,
                onClick: withModifiers(getHuePickerPos, ["stop"]),
                onMousedown: _cache[6] || (_cache[6] = withModifiers(($event) => bindDown($event, getHuePickerPos), ["stop"]))
              }, [
                createElementVNode("div", {
                  class: "picker",
                  ref_key: "huePickerEl",
                  ref: huePickerEl,
                  style: { "top": "-1px" },
                  onMousedown: _cache[5] || (_cache[5] = withModifiers(($event) => bindDown($event, getHuePickerPos), ["stop"]))
                }, null, 544)
              ], 40, _hoisted_14),
              __props.showOpacityPicker ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "opacity-bar",
                ref_key: "opactiyBarEl",
                ref: opactiyBarEl,
                onClick: withModifiers(getOpacityPickerPos, ["stop"]),
                onMousedown: _cache[8] || (_cache[8] = withModifiers(($event) => bindDown($event, getOpacityPickerPos), ["stop"]))
              }, [
                createElementVNode("div", {
                  class: "picker",
                  ref_key: "opacityPickerEl",
                  ref: opacityPickerEl,
                  style: { "top": "-1px" },
                  onClick: withModifiers(getOpacityPickerPos, ["stop"]),
                  onMousedown: _cache[7] || (_cache[7] = withModifiers(($event) => bindDown($event, getOpacityPickerPos), ["stop"]))
                }, null, 40, _hoisted_16)
              ], 40, _hoisted_15)) : createCommentVNode("", true)
            ]),
            createElementVNode("div", _hoisted_17, [
              createElementVNode("div", {
                class: "preview-color",
                style: normalizeStyle({ background: previewColor.value })
              }, null, 4)
            ])
          ])
        ], 40, _hoisted_2), [
          [vShow, __props.showPanelOnly || isShowPanel.value]
        ])
      ]);
    };
  }
});
var ColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3699d9f0"]]);
export { ColorPicker as default };
