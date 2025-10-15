"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceClient = exports.UserServiceService = exports.UserResponse = exports.GetUserByIdRequest = exports.protobufPackage = void 0;
const wire_1 = require("@bufbuild/protobuf/wire");
const grpc_js_1 = require("@grpc/grpc-js");
exports.protobufPackage = "user";
function createBaseGetUserByIdRequest() {
    return { id: "" };
}
exports.GetUserByIdRequest = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetUserByIdRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        return obj;
    },
    create(base) {
        return exports.GetUserByIdRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetUserByIdRequest();
        message.id = object.id ?? "";
        return message;
    },
};
function createBaseUserResponse() {
    return { id: "", name: "", email: "" };
}
exports.UserResponse = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.email !== "") {
            writer.uint32(26).string(message.email);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseUserResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                }
                case 2: {
                    if (tag !== 18) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                }
                case 3: {
                    if (tag !== 26) {
                        break;
                    }
                    message.email = reader.string();
                    continue;
                }
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            id: isSet(object.id) ? globalThis.String(object.id) : "",
            name: isSet(object.name) ? globalThis.String(object.name) : "",
            email: isSet(object.email) ? globalThis.String(object.email) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.email !== "") {
            obj.email = message.email;
        }
        return obj;
    },
    create(base) {
        return exports.UserResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseUserResponse();
        message.id = object.id ?? "";
        message.name = object.name ?? "";
        message.email = object.email ?? "";
        return message;
    },
};
exports.UserServiceService = {
    getUserById: {
        path: "/user.UserService/GetUserById",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.GetUserByIdRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.GetUserByIdRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.UserResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.UserResponse.decode(value),
    },
};
exports.UserServiceClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.UserServiceService, "user.UserService");
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=user.js.map