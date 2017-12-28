﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using TripAngular4Core.Domain;

namespace TripAngular4Core.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("TripAngular4Core.Domain.Address", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address1");

                    b.Property<string>("Address2");

                    b.Property<string>("Address3");

                    b.Property<string>("Address4");

                    b.Property<string>("Address5");

                    b.Property<string>("PostCode");

                    b.HasKey("Id");

                    b.ToTable("Address");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.List", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<Guid?>("OwnerId");

                    b.Property<string>("Password");

                    b.Property<bool>("Public");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Lists");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("AddressId");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.Property<int>("Nights");

                    b.Property<double>("Price");

                    b.HasKey("Id");

                    b.HasIndex("AddressId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DisplayName");

                    b.Property<Guid?>("DownVoteLocationId");

                    b.Property<string>("Password");

                    b.Property<Guid?>("UpVoteLocationId");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("DownVoteLocationId");

                    b.HasIndex("UpVoteLocationId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.UserList", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<int>("ListId");

                    b.HasKey("UserId", "ListId");

                    b.HasIndex("ListId");

                    b.ToTable("UserList");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.List", b =>
                {
                    b.HasOne("TripAngular4Core.Domain.User", "Owner")
                        .WithMany("OwnedLists")
                        .HasForeignKey("OwnerId");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.Location", b =>
                {
                    b.HasOne("TripAngular4Core.Domain.Address", "Address")
                        .WithMany()
                        .HasForeignKey("AddressId");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.User", b =>
                {
                    b.HasOne("TripAngular4Core.Domain.Location", "DownVoteLocation")
                        .WithMany("DownVotes")
                        .HasForeignKey("DownVoteLocationId");

                    b.HasOne("TripAngular4Core.Domain.Location", "UpVoteLocation")
                        .WithMany("UpVotes")
                        .HasForeignKey("UpVoteLocationId");
                });

            modelBuilder.Entity("TripAngular4Core.Domain.UserList", b =>
                {
                    b.HasOne("TripAngular4Core.Domain.List", "List")
                        .WithMany("Users")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("TripAngular4Core.Domain.User", "User")
                        .WithMany("MemberOfLists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
