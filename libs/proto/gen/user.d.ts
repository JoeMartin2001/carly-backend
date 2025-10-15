import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, type ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, type Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export declare const protobufPackage = "user";
export interface FindOneById {
    id: string;
}
export interface FindAllRequest {
}
export interface FindAllResponse {
    users: User[];
}
export interface User {
    id: string;
    name: string;
    email: string;
}
export declare const FindOneById: MessageFns<FindOneById>;
export declare const FindAllRequest: MessageFns<FindAllRequest>;
export declare const FindAllResponse: MessageFns<FindAllResponse>;
export declare const User: MessageFns<User>;
export type UserServiceService = typeof UserServiceService;
export declare const UserServiceService: {
    readonly findOne: {
        readonly path: "/user.UserService/FindOne";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: FindOneById) => Buffer;
        readonly requestDeserialize: (value: Buffer) => FindOneById;
        readonly responseSerialize: (value: User) => Buffer;
        readonly responseDeserialize: (value: Buffer) => User;
    };
    readonly findAll: {
        readonly path: "/user.UserService/FindAll";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: FindAllRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => FindAllRequest;
        readonly responseSerialize: (value: FindAllResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => FindAllResponse;
    };
};
export interface UserServiceServer extends UntypedServiceImplementation {
    findOne: handleUnaryCall<FindOneById, User>;
    findAll: handleUnaryCall<FindAllRequest, FindAllResponse>;
}
export interface UserServiceClient extends Client {
    findOne(request: FindOneById, callback: (error: ServiceError | null, response: User) => void): ClientUnaryCall;
    findOne(request: FindOneById, metadata: Metadata, callback: (error: ServiceError | null, response: User) => void): ClientUnaryCall;
    findOne(request: FindOneById, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: User) => void): ClientUnaryCall;
    findAll(request: FindAllRequest, callback: (error: ServiceError | null, response: FindAllResponse) => void): ClientUnaryCall;
    findAll(request: FindAllRequest, metadata: Metadata, callback: (error: ServiceError | null, response: FindAllResponse) => void): ClientUnaryCall;
    findAll(request: FindAllRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: FindAllResponse) => void): ClientUnaryCall;
}
export declare const UserServiceClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): UserServiceClient;
    service: typeof UserServiceService;
    serviceName: string;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export interface MessageFns<T> {
    encode(message: T, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): T;
    fromJSON(object: any): T;
    toJSON(message: T): unknown;
    create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
    fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
export {};
