package hr.tvz.project.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import hr.tvz.project.enums.RoleEnum;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
	
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
        .cors().and().csrf().disable()
        .authorizeRequests()
        .antMatchers(HttpMethod.GET, "/rac/vehicles/**").permitAll()
        .antMatchers(HttpMethod.POST, "/rac/vehicles/**").hasAuthority(RoleEnum.ROLE_ADMIN.toString())
        .antMatchers(HttpMethod.POST, "/rac/users/**").permitAll()
        .anyRequest().authenticated()
        .and()
        .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}

}
