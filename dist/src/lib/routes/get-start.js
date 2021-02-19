"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = __importDefault(require("../Camera"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
        res.send('ERROR: Invalid URL');
        return;
    }
    const camera = new Camera_1.default();
    camera.start(url);
    res.send(`Streaming to ${url}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXN0YXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9yb3V0ZXMvZ2V0LXN0YXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdURBQStCO0FBRS9CLGtCQUFlLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDbkUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7UUFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQy9CLE9BQU87S0FDUjtJQUVELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IENhbWVyYSBmcm9tICcuLi9DYW1lcmEnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSkgPT4ge1xuICBjb25zdCB7IHVybCB9ID0gcmVxLnF1ZXJ5O1xuXG4gIGlmICghdXJsIHx8IHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmVzLnNlbmQoJ0VSUk9SOiBJbnZhbGlkIFVSTCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcbiAgY2FtZXJhLnN0YXJ0KHVybCk7XG5cbiAgcmVzLnNlbmQoYFN0cmVhbWluZyB0byAke3VybH1gKTtcbn07XG4iXX0=