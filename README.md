# Garage Development Approach

**Approach**
**🔹 Step 1: Lay the Foundation**
**What to do:**

1. **Create a new Spring Boot project** (via Spring Initializr).
    - Dependencies:
        
        Spring Web, Spring Data JPA, Spring Security, Validation,
        
        PostgreSQL Driver, Springdoc OpenAPI (Swagger), Lombok, Flyway.
        
2. Set up **application.yml** (DB, security configs).
3. Configure **Flyway migrations** with an empty V1__init.sql (will add tables later).
4. Add **common module**:
    - Exception handling (@ControllerAdvice).
    - DTO response wrapper.
    - Standard error JSON (RFC 7807 style).
    - Logging filter for requests.

👉 **Why first?** Because this scaffolding is reusable for all modules. You don’t want to copy-paste error handling or DB config later.

---

**🔹 Step 2: Build Authentication & Users (Auth Module)**

This is your **foundation**. Every other module depends on user identity.

**What to do:**

1. Create User entity (id, email, password, role, etc.).
2. Define Role enum (CAR_OWNER, GARAGE_ADMIN, MECHANIC, SYS_ADMIN).
3. Add repositories & services for users.
4. Implement **JWT auth**:
    - Login (POST /api/v1/auth/login).
    - Register endpoints:
        - /auth/register-owner (Car Owner).
        - /auth/register-garage-admin (Garage Admin → SysAdmin must later approve garage).
5. Secure endpoints with @PreAuthorize("hasRole('...')").

👉 **Why second?** Because you need users & roles before garages, mechanics, or requests can be tied to someone.

**🔹 Step 3: Garage Module**

This is where the **garage-first principle** begins.

**What to do:**

1. Create Garage entity (id, name, status, ownerUserId, etc.).
2. Create Mechanic entity (id, garageId, name, phone, active).
3. Implement Garage endpoints:
    - Garage Admin: POST /garages (register garage).
    - SysAdmin: POST /admin/garages/{id}/approve (verify garage).
    - Garage Admin: POST /garages/{id}/mechanics (add mechanics).
    - Garage Admin: GET /garages/{id}/mechanics.

👉 **Why third?** Because garages are the foundation of requests. Without garages + mechanics, you can’t create service requests.

---

**🔹 Step 4: Services Module (Service Categories & Definitions)**

Define what garages actually *offer*.

**What to do:**

1. Create ServiceCategory (Emergency, Repair, Maintenance…).
2. Create ServiceDefinition (e.g., “Tyre Change – Ksh 1500”).
3. Endpoints:
    - GET /categories (all categories).
    - Garage Admin: POST /garages/{id}/services (add service with price).
    - GET /garages/{id}/services.

👉 **Why fourth?** Because when a Car Owner requests a service, it must reference a service definition.

---

**🔹 Step 5: Requests Module (The Core Workflow)**

This is the **heart of the system**.

**What to do:**

1. Create ServiceRequest entity (status lifecycle).
2. Create JobAssignment entity (link request ↔︎ mechanic).
3. Implement status transitions:
    - Owner: POST /requests (create).
    - Garage Admin: /requests/{id}/approve, /requests/{id}/assign.
    - Mechanic: /requests/{id}/accept, /requests/{id}/status.
    - Owner: /requests/{id}/cancel.
4. Publish events: RequestCreatedEvent, RequestCompletedEvent.

👉 **Why fifth?** Because now all pieces exist (users, garages, services, mechanics). You can finally execute the full “request service → get mechanic → complete” workflow.

---

**🔹 Step 6: Billing Module**

Once requests can complete, add money flow.

**What to do:**

1. Create Payment entity (id, requestId, amount, status).
2. Create CommissionRecord (garage commission).
3. Add endpoints:
    - Owner: /requests/{id}/pay (mock payment for now).
    - SysAdmin: /admin/commissions (view commissions).

👉 **Why sixth?** Payments only matter once requests can complete. Build workflows first, money later.

---

**🔹 Step 7: Rating Module**

Now enable user feedback.

**What to do:**

1. Create Rating entity (linked to request + garage + mechanic).
2. Endpoint: /requests/{id}/rating.

👉 **Why seventh?** Feedback only makes sense after jobs complete.

---

**🔹 Step 8: Admin Module**

Final step: **platform oversight**.

**What to do:**

1. Endpoints for SysAdmin:
    - /admin/garages/pending (list pending garages).
    - /admin/garages/{id}/approve or /suspend.
    - /admin/disputes.

👉 **Why last?** Admin oversight is important but depends on all other modules.

---

**🔹 Step 9: Cross-Cutting Concerns**

- Add **Swagger/OpenAPI** docs.
- Add **global exception handling**.
- Add **tests** (unit + integration).
- Add **logging + monitoring** (Spring Boot Actuator).

---

**🔹 Step 10: Integration with Angular (Frontend Contract)**

- Return consistent DTOs.
- Always include id, status, createdAt, updatedAt.
- Use camelCase JSON.
- Document endpoints in Swagger → Angular consumes directly.
