import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOkResponse, ApiCreatedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Register a new user',
    description: 'Creates a new user account with username and password. The username must be unique and can only contain letters, numbers, and underscores. Password must be at least 6 characters long.'
  })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'User registered successfully', schema: { example: { message: 'User registered successfully', data: { id: 'uuid', username: 'johndoe' } } } })
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    
    return {
      message: 'User registered successfully',
      data: result,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'User login',
    description: 'Authenticates a user with username and password. Returns a JWT access token that can be used for authenticated requests. Include the token in the Authorization header as "Bearer <token>" for protected endpoints.'
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: 'Login successful', schema: { example: { message: 'Login successful', data: { accessToken: 'jwt.token.here', user: { id: 'uuid', username: 'johndoe' } } } } })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    
    return {
      message: 'Login successful',
      data: result,
    };
  }
}
