"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = __importDefault(require("../Camera"));
exports.default = (req, res) => {
    const camera = new Camera_1.default();
    camera.stop();
    res.send('Stream stopped!');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXN0b3AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3JvdXRlcy9nZXQtc3RvcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHVEQUErQjtBQUUvQixrQkFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxFQUFFO0lBQzdELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVkLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM5QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBDYW1lcmEgZnJvbSAnLi4vQ2FtZXJhJztcblxuZXhwb3J0IGRlZmF1bHQgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UpID0+IHtcbiAgY29uc3QgY2FtZXJhID0gbmV3IENhbWVyYSgpO1xuICBjYW1lcmEuc3RvcCgpO1xuXG4gIHJlcy5zZW5kKCdTdHJlYW0gc3RvcHBlZCEnKTtcbn07XG4iXX0=