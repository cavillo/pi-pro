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
const Server_1 = __importDefault(require("./lib/Server"));
const server = new Server_1.default();
server.init()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('server running on pid', process.pid);
}))
    .catch((error) => {
    console.error('Exiting', error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwREFBa0M7QUFFbEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLElBQUksRUFBRTtLQUNWLElBQUksQ0FBQyxHQUFTLEVBQUU7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNwRCxDQUFDLENBQUEsQ0FBQztLQUNELEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2VydmVyIGZyb20gJy4vbGliL1NlcnZlcic7XG5cbmNvbnN0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcblxuc2VydmVyLmluaXQoKVxuICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ3NlcnZlciBydW5uaW5nIG9uIHBpZCcsIHByb2Nlc3MucGlkKTtcbiAgfSlcbiAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0V4aXRpbmcnLCBlcnJvcik7XG4gIH0pOyJdfQ==