import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, type ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, type Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export declare const protobufPackage = "user";
export interface GetUserByIdRequest {
    id: string;
}
export interface UserResponse {
    id: string;
    name: string;
    email: string;
}
export declare const GetUserByIdRequest: MessageFns<GetUserByIdRequest>;
export declare const UserResponse: MessageFns<UserResponse>;
export type UserServiceService = typeof UserServiceService;
export declare const UserServiceService: {
    readonly getUserById: {
        readonly path: "/user.UserService/GetUserById";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: GetUserByIdRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => GetUserByIdRequest;
        readonly responseSerialize: (value: UserResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => UserResponse;
    };
};
export interface UserServiceServer extends UntypedServiceImplementation {
    getUserById: handleUnaryCall<GetUserByIdRequest, UserResponse>;
}
export interface UserServiceClient extends Client {
    getUserById(request: GetUserByIdRequest, callback: (error: ServiceError | null, response: UserResponse) => void): ClientUnaryCall;
    getUserById(request: GetUserByIdRequest, metadata: Metadata, callback: (error: ServiceError | null, response: UserResponse) => void): ClientUnaryCall;
    getUserById(request: GetUserByIdRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: UserResponse) => void): ClientUnaryCall;
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
