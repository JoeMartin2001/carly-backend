"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceClient = exports.UserServiceService = exports.User = exports.FindAllResponse = exports.FindAllRequest = exports.FindOneById = exports.protobufPackage = void 0;
const wire_1 = require("@bufbuild/protobuf/wire");
const grpc_js_1 = require("@grpc/grpc-js");
exports.protobufPackage = "user";
function createBaseFindOneById() {
    return { id: "" };
}
exports.FindOneById = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindOneById();
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
        return exports.FindOneById.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFindOneById();
        message.id = object.id ?? "";
        return message;
    },
};
function createBaseFindAllRequest() {
    return {};
}
exports.FindAllRequest = {
    encode(_, writer = new wire_1.BinaryWriter()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindAllRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skip(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.FindAllRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseFindAllRequest();
        return message;
    },
};
function createBaseFindAllResponse() {
    return { users: [] };
}
exports.FindAllResponse = {
    encode(message, writer = new wire_1.BinaryWriter()) {
        for (const v of message.users) {
            exports.User.encode(v, writer.uint32(10).fork()).join();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof wire_1.BinaryReader ? input : new wire_1.BinaryReader(input);
        const end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindAllResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1: {
                    if (tag !== 10) {
                        break;
                    }
                    message.users.push(exports.User.decode(reader, reader.uint32()));
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
        return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e) => exports.User.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.users?.length) {
            obj.users = message.users.map((e) => exports.User.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.FindAllResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFindAllResponse();
        message.users = object.users?.map((e) => exports.User.fromPartial(e)) || [];
        return message;
    },
};
function createBaseUser() {
    return { id: "", name: "", email: "" };
}
exports.User = {
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
        const message = createBaseUser();
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
        return exports.User.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseUser();
        message.id = object.id ?? "";
        message.name = object.name ?? "";
        message.email = object.email ?? "";
        return message;
    },
};
exports.UserServiceService = {
    findOne: {
        path: "/user.UserService/FindOne",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.FindOneById.encode(value).finish()),
        requestDeserialize: (value) => exports.FindOneById.decode(value),
        responseSerialize: (value) => Buffer.from(exports.User.encode(value).finish()),
        responseDeserialize: (value) => exports.User.decode(value),
    },
    findAll: {
        path: "/user.UserService/FindAll",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.FindAllRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.FindAllRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.FindAllResponse.encode(value).finish()),
        responseDeserialize: (value) => exports.FindAllResponse.decode(value),
    },
};
exports.UserServiceClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.UserServiceService, "user.UserService");
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=user.js.map