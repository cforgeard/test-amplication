/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { AclValidateRequestInterceptor } from "../../interceptors/aclValidateRequest.interceptor";
import { CreateFileArgs } from "./CreateFileArgs";
import { UpdateFileArgs } from "./UpdateFileArgs";
import { DeleteFileArgs } from "./DeleteFileArgs";
import { FileFindManyArgs } from "./FileFindManyArgs";
import { FileFindUniqueArgs } from "./FileFindUniqueArgs";
import { File } from "./File";
import { FileService } from "../file.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => File)
export class FileResolverBase {
  constructor(
    protected readonly service: FileService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async _filesMeta(
    @graphql.Args() args: FileFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [File])
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "any",
  })
  async files(@graphql.Args() args: FileFindManyArgs): Promise<File[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => File, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "read",
    possession: "own",
  })
  async file(@graphql.Args() args: FileFindUniqueArgs): Promise<File | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => File)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "create",
    possession: "any",
  })
  async createFile(@graphql.Args() args: CreateFileArgs): Promise<File> {
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @common.UseInterceptors(AclValidateRequestInterceptor)
  @graphql.Mutation(() => File)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "update",
    possession: "any",
  })
  async updateFile(@graphql.Args() args: UpdateFileArgs): Promise<File | null> {
    try {
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => File)
  @nestAccessControl.UseRoles({
    resource: "File",
    action: "delete",
    possession: "any",
  })
  async deleteFile(@graphql.Args() args: DeleteFileArgs): Promise<File | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
