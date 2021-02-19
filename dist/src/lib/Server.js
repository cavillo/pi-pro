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
const express_1 = __importDefault(require("express"));
const get_home_1 = __importDefault(require("./routes/get-home"));
const get_start_1 = __importDefault(require("./routes/get-start"));
const get_stop_1 = __importDefault(require("./routes/get-stop"));
const not_found_1 = __importDefault(require("./routes/not-found"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = parseInt(process.env.PORT, 10) || 8000;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // basics mw
            // routes
            this.app.get('/', get_home_1.default);
            this.app.get('/start', get_start_1.default);
            this.app.get('/stop', get_stop_1.default);
            this.app.use(not_found_1.default);
            this.app.listen(this.port, () => {
                console.log('Server started on port', this.port);
            });
        });
    }
}
exports.default = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9TZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsaUVBQXFDO0FBQ3JDLG1FQUEwQztBQUMxQyxpRUFBd0M7QUFDeEMsbUVBQTBDO0FBRTFDLE1BQXFCLE1BQU07SUFJekI7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUM7SUFDckQsQ0FBQztJQUVLLElBQUk7O1lBQ1IsWUFBWTtZQUVaLFNBQVM7WUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsa0JBQUksQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxtQkFBUSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGtCQUFPLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBUSxDQUFDLENBQUM7WUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0NBQ0Y7QUF0QkQseUJBc0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgaG9tZSBmcm9tICcuL3JvdXRlcy9nZXQtaG9tZSc7XG5pbXBvcnQgZ2V0U3RhcnQgZnJvbSAnLi9yb3V0ZXMvZ2V0LXN0YXJ0JztcbmltcG9ydCBnZXRTdG9wIGZyb20gJy4vcm91dGVzL2dldC1zdG9wJztcbmltcG9ydCBub3RGb3VuZCBmcm9tICcuL3JvdXRlcy9ub3QtZm91bmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXIge1xuICBwcml2YXRlIGFwcDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcbiAgcHJpdmF0ZSBwb3J0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XG4gICAgdGhpcy5wb3J0ID0gcGFyc2VJbnQocHJvY2Vzcy5lbnYuUE9SVCwgMTApIHx8IDgwMDA7XG4gIH1cblxuICBhc3luYyBpbml0KCkge1xuICAgIC8vIGJhc2ljcyBtd1xuXG4gICAgLy8gcm91dGVzXG4gICAgdGhpcy5hcHAuZ2V0KCcvJywgaG9tZSk7XG4gICAgdGhpcy5hcHAuZ2V0KCcvc3RhcnQnLCBnZXRTdGFydCk7XG4gICAgdGhpcy5hcHAuZ2V0KCcvc3RvcCcsIGdldFN0b3ApO1xuICAgIHRoaXMuYXBwLnVzZShub3RGb3VuZCk7XG5cbiAgICB0aGlzLmFwcC5saXN0ZW4odGhpcy5wb3J0LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnU2VydmVyIHN0YXJ0ZWQgb24gcG9ydCcsIHRoaXMucG9ydCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==