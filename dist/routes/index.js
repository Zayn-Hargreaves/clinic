"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_route_1 = __importDefault(require("./supplier.route"));
const statistics_route_1 = __importDefault(require("./statistics.route"));
const appointment_route_1 = __importDefault(require("./appointment.route"));
const router = (0, express_1.Router)();
router.use('/suppliers', supplier_route_1.default);
router.use('/reports', statistics_route_1.default);
router.use('/appointment', appointment_route_1.default);
exports.default = router;
