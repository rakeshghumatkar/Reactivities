using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> //return nothing so it dont have anything
        {
            public Activity Activity { get; set; } // getting an activity as argument
        }

        public class Handler : IRequestHandler<Command, Result<Unit>> 
        {
            private readonly DataContext _context ;
            public Handler(DataContext context)
            {
                 _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;
                if(!result)
                    return Result<Unit>.Failure("Create activity failed");
                else
                    return Result<Unit>.Success(Unit.Value);
            }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }
    }
}