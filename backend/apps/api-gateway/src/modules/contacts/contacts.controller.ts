import { Controller, Post, Body, UseGuards, Inject, Delete, Param, Get } from "@nestjs/common";
import { RegisterContactDto, ContactOutput } from "./dtos/ContactDto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { CONTACTS_SERVICE, EVENTS } from "@margazm/common";

@ApiTags("Contacts")
@ApiBearerAuth("access-token")
@Controller("contacts")
export class ContactController {
  constructor(@Inject(CONTACTS_SERVICE) private readonly contactClient: ClientProxy) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Register new contact" })
  @ApiResponse({ status: 201, description: "Contact successfully registered." })
  async register(@Body() registerContactDto: RegisterContactDto): Promise<ContactOutput> {
    return await firstValueFrom(
      this.contactClient.send(EVENTS.CONTACTS.REGISTER, registerContactDto),
    );
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete contact" })
  @ApiResponse({ status: 200, description: "Successfully deleted." })
  async delete(@Param("id") id: string): Promise<ContactOutput> {
    return await firstValueFrom(this.contactClient.send(EVENTS.CONTACTS.DELETE, id));
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get contact by ID" })
  @ApiResponse({ status: 200, description: "Success" })
  async getById(@Param("id") id: string): Promise<ContactOutput> {
    return await firstValueFrom(this.contactClient.send(EVENTS.CONTACTS.GET_BY_ID, id));
  }
}
